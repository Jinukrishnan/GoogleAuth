import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
      required: true,
      unique: true,
      type: String,
    },
    name: {
      required: true,
      type: String
    },
    password: {
      required: false,
      type: String
    },
    authSource: {
        type:String,
    //   enum: ["self", "google"],
      default: "self"
    }
  });
 export default mongoose.models.user ||mongoose.model("user", userSchema);