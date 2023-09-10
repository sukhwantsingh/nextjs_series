import mongoose, { connection } from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const isConnected = mongoose.connection;

    isConnected.on("connected", () => {
      console.log("MongoDB connection established successfully!");
    });

    isConnected.on("error", (err) => {
      console.log(
        "MongoDB connection error, Please make sure MongoDB is running." + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong!");
    console.log(error);
  }
}
