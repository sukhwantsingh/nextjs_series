import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(reqBody);

    const dbUserData = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!dbUserData) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
    }
    console.log(dbUserData);

    dbUserData.isVerified = true;
    dbUserData.verifyToken = undefined;
    dbUserData.verifyTokenExpiry = undefined;

    await dbUserData.save();

    return NextResponse.json({
      message: "Email is verified, Thankyou for verifying",
      success: true,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
