import mongoose from "mongoose";

export const connection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "Jobivist_DB",
    })
    .then(() => {
      console.log("Connected to the JobivistDB");
    })
    .catch((er) => {
      console.log(`Some error occurred: ${er.message}`);
    });
};
