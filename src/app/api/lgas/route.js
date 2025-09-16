import { NextResponse } from "next/server";
import statesData from "../../../../public/areas.json";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const regionName = searchParams.get("region");

  if (!regionName) {
    return NextResponse.json(
      { error: "Region (state) is required" },
      { status: 400 }
    );
  }

  try {
    // Match region name (case-insensitive)
    const state = statesData.find(
      (s) => s.state.toLowerCase() === regionName.toLowerCase()
    );

    if (!state) {
      return NextResponse.json(
        { error: `No LGAs found for region: ${regionName}` },
        { status: 404 }
      );
    }

    // Return LGAs
    const lgas = state.lgas.map((lga, index) => ({
      id: index + 1, // fallback ID
      name: lga.name,
    }));

    return NextResponse.json(lgas);
  } catch (error) {
    console.error("Error fetching LGAs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
