export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { getRegionId } from "@/lib/lga-to-region";
import { jwtVerify } from "jose";

async function authenticate(request) {
  const token = request.cookies.get("auth_token")?.value;
  if (!token) {
    logger.warn("No auth_token found in profile request");
    return null;
  }
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    logger.info("Token verified in profile route", { userId: payload.userId });
    return payload;
  } catch (error) {
    logger.warn("Token verification failed in profile route", {
      error: error.message,
    });
    return null;
  }
}

export async function PUT(request) {
  try {
    // Authenticate user
    const payload = await authenticate(request);
    if (!payload?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse form data
    const formData = await request.formData();
    const name = formData.get("name");
    const region = formData.get("region");
    const lga = formData.get("lga");
    const address = formData.get("address");
    const pID = formData.get("pID");
    const photo = formData.get("photo"); // Dummy: photo file is received but not processed

    // Validate required fields
    if (!pID || pID !== payload.userId) {
      logger.warn("Invalid profile ID", { pID, userId: payload.userId });
      return NextResponse.json(
        { error: "Invalid profile ID" },
        { status: 400 }
      );
    }
    if (!name) {
      logger.warn("Missing name", { pID });
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!region) {
      logger.warn("Missing region", { pID });
      return NextResponse.json({ error: "State is required" }, { status: 400 });
    }
    if (!lga) {
      logger.warn("Missing LGA", { pID });
      return NextResponse.json({ error: "LGA is required" }, { status: 400 });
    }
    if (!address) {
      logger.warn("Missing address", { pID });
      return NextResponse.json(
        { error: "Address is required" },
        { status: 400 }
      );
    }

    // Validate region and LGA using getRegionId
    const regionId = await getRegionId(region, lga);
    if (!regionId) {
      logger.warn("Invalid region or LGA", { region, lga, pID });
      return NextResponse.json(
        { error: "Invalid state or LGA" },
        { status: 400 }
      );
    }

    // Prepare update data (exclude email and phone)
    const updateData = {
      bk_customer_full_name: name,
      bk_lga: lga,
      bk_default_region: regionId,
      bk_address: address,
    };

    // Dummy photo handling: log that a photo was received but do not process
    if (photo) {
      logger.info("Received photo file (not processed)", {
        pID,
        filename: photo.name,
      });
      // Placeholder for AWS S3 upload
      /*
      const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
      });
      const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `profile-photos/${pID}-${Date.now()}${path.extname(photo.name)}`,
        Body: photo,
        ContentType: photo.type,
        ACL: "public-read",
      };
      const uploadResult = await s3.upload(uploadParams).promise();
      updateData.bk_photo = uploadResult.Location;
      logger.info("Photo uploaded to S3", { pID, url: uploadResult.Location });
      */
      // For now, do not update bk_photo
    }

    // Update user in database
    const updatedUser = await prisma.bk_repository.update({
      where: { bk_uid: pID },
      data: updateData,
      select: {
        bk_uid: true,
        bk_customer_full_name: true,
        bk_email: true,
        bk_phone_number: true,
        bk_lga: true,
        bk_default_region: true,
        bk_address: true,
        bk_photo: true,
        regions: {
          select: { reg_label: true },
        },
      },
    });

    logger.info("Profile updated successfully", { uid: pID });
    return NextResponse.json(
      {
        message: "Profile updated successfully",
        user: {
          id: String(updatedUser.bk_uid),
          name: updatedUser.bk_customer_full_name,
          email: updatedUser.bk_email,
          phone: updatedUser.bk_phone_number,
          region:
            updatedUser.regions?.reg_label || updatedUser.bk_default_region,
          lga: updatedUser.bk_lga,
          address: updatedUser.bk_address,
          photo: updatedUser.bk_photo || "/default-avatar.png",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Profile update error", {
      error: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    // Authenticate user
    const payload = await authenticate(request);
    if (!payload?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user profile with region label
    const user = await prisma.bk_repository.findUnique({
      where: { bk_uid: payload.userId },
      select: {
        bk_uid: true,
        bk_customer_full_name: true,
        bk_email: true,
        bk_phone_number: true,
        bk_lga: true,
        bk_default_region: true,
        bk_address: true,
        bk_photo: true,
        regions: {
          select: { reg_label: true },
        },
      },
    });

    if (!user) {
      logger.warn("User not found", { uid: payload.userId });
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    logger.info("Profile fetched successfully", { uid: payload.userId });
    return NextResponse.json(
      {
        user: {
          id: String(user.bk_uid),
          name: user.bk_customer_full_name,
          email: user.bk_email,
          phone: user.bk_phone_number,
          region: user.regions?.reg_label || user.bk_default_region,
          lga: user.bk_lga,
          address: user.bk_address || "",
          photo: user.bk_photo || "/default-avatar.png",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Profile fetch error", {
      error: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
