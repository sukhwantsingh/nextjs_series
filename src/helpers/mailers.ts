// domain.com/verifytoken/afddfdfsafsfdfdf  // server componenet
// domain.com/veryfiytoken?=ddffdfdfdsfsafsa  // for client side
import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // add the token to the database with expired option
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 360000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 360000,
      });
    }

    // send email to the required email
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "3f575f0499ab92",
        pass: "6ee56e350dfce1",
      },
    });

    const mailOptions = {
      from: "sukhwant@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p> Click <a href = "${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}"> Here </a> to ${
        emailType === "VERIFY" ? "Verify your email" : "Reset your password"
      } or copy and paste the link in your browser 
      ${process.env.DOMAIN}/verifyemail?token=${hashedToken}     
      </p>`,
    };

    const emailResponse = await transport.sendMail(mailOptions);
    return emailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
