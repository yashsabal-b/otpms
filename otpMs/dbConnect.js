import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://Iamdead:Bat_man2@cs21m7.4iep8.mongodb.net/tasky-m10"
    );
    console.log(`Mongo DB Connected`);
  } catch (error) {
    console.error(error);
  }
}

connectDB();
