import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userIdFromToken = await getDataFromToken(request);
    console.log(userIdFromToken);

    const userFromDb = await User.findOne({ _id: userIdFromToken }).select(
      "-password"
    );

    return NextResponse.json({
      message: "User-found",
      data: userFromDb,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
