import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../../../lib/logger";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    // Verify auth_token
    let userId = null;
    const token = request.cookies.get("auth_token")?.value;
    if (token) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      userId = payload.userId;
      logger.info("Token verified", {
        userId,
        mustChangePassword: payload.mustChangePassword,
      });
    } else {
      logger.warn("No auth_token provided in dl_application");
      return NextResponse.json(
        { error: "Unauthorized: Please log in" },
        { status: 401 }
      );
    }

    // Parse FormData
    const formData = await request.formData();
    const service_id = formData.get("service_id");
    const service_name = formData.get("service_name") || "";
    const price = parseFloat(formData.get("price"));
    const files = [];
    for (let i = 0; formData.get(`file${i}`); i++) {
      files.push(formData.get(`file${i}`));
    }

    logger.info("Received form data", {
      service_id,
      service_name,
      fileCount: files.length,
    });

    // Validate file count
    let requiredFileCount = 0;
    let requiredFileNames = [];
    if (service_name.includes("Fresh")) {
      requiredFileCount = 0;
      requiredFileNames = [];
    } else if (service_name.includes("Renewal")) {
      requiredFileCount = 1;
      requiredFileNames = ["Previous Driver's License"];
    } else if (service_name.includes("International")) {
      requiredFileCount = 3;
      requiredFileNames = [
        "Current Driver's License",
        "International Passport",
        "Passport Photo",
      ];
    } else {
      logger.warn("Unknown service_name", { service_name });
      return NextResponse.json(
        { error: "Invalid service type" },
        { status: 400 }
      );
    }

    if (files.length !== requiredFileCount) {
      logger.warn("Invalid number of files uploaded", {
        service_id,
        fileCount: files.length,
        requiredFileCount,
      });
      return NextResponse.json(
        {
          error: `Exactly ${requiredFileCount} document(s) required${requiredFileCount > 0 ? `: ${requiredFileNames.join(", ")}` : ""}`,
        },
        { status: 400 }
      );
    }

    // Validate service
    const service = await prisma.vehicle_service_sub.findUnique({
      where: { vss_id: parseInt(service_id) },
      select: {
        vss_id: true,
        vs_id_fk: true,
        vss_status: true,
        vss_amount: true,
        vss_va_duration: true,
      },
    });

    if (!service || service.vs_id_fk !== 8 || service.vss_status !== 1) {
      logger.warn("Invalid or inactive service", { service_id });
      return NextResponse.json(
        { error: "Invalid or inactive service" },
        { status: 400 }
      );
    }

    // Handle file uploads
    let fileUrls = [];
    if (files.length > 0) {
      // TODO: Integrate with cloud storage (e.g., AWS S3)
      /*
      const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
      const s3Client = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      });

      for (const file of files) {
        const fileKey = `uploads/${userId}/${service_id}/${Date.now()}-${file.name}`;
        const command = new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: fileKey,
          Body: await file.arrayBuffer(),
          ContentType: file.type,
        });
        await s3Client.send(command);
        fileUrls.push(`https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`);
      }
      */
      // Placeholder until cloud storage is implemented
      fileUrls = files.map(
        (file) => `uploads/${userId}/${service_id}/${file.name}`
      );
      logger.info("File upload placeholder", { fileUrls });
    }

    // Prepare data for dl_application
    const applicationData = {
      user_id: BigInt(userId), // Store user ID separately
      service_id,
      date_created: new Date(),
      ...(service_name.includes("Fresh") && {
        first_name: formData.get("first_name") || null,
        surname: formData.get("surname") || null,
        other_name: formData.get("other_name") || null,
        mother_maiden_name: formData.get("mother_maiden_name") || null,
        date_of_birth: formData.get("date_of_birth") || null,
        facial_mark: formData.get("facial_mark") || null,
        blood_group: formData.get("blood_group") || null,
        any_form_of_disability: formData.get("any_form_of_disability") || null,
        height: formData.get("height") || null,
        sex: formData.get("sex") || null,
        licence_class: formData.get("licence_class") || null,
        next_of_kin_phone_number:
          formData.get("next_of_kin_phone_number") || null,
        state_of_origin: formData.get("state_of_origin") || null,
        local_government: formData.get("local_government") || null,
        email_address: formData.get("email_address") || null,
        nin: formData.get("nin") || null,
      }),
      phone_number: formData.get("phone_number") || null,
      address: formData.get("address") || null,
      file_urls: fileUrls.length > 0 ? fileUrls.join(",") : null, // Store file URLs
    };

    // Store in dl_application
    const dlApplication = await prisma.dl_application.create({
      data: applicationData,
    });

    logger.info("Driver's license application created", {
      userId,
      service_id,
      applicationId: dlApplication.uid,
      service_name,
    });

    // Generate IDs for response
    const batchId = uuidv4();
    const applicationId = dlApplication.uid.toString(); // Convert BigInt to string

    return NextResponse.json(
      {
        message: "Application submitted",
        applicationId,
        paymentRef: batchId,
        dl_application_id: dlApplication.uid.toString(), // Convert BigInt to string
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Error submitting driver's license application", {
      error: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
