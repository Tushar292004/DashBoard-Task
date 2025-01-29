import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  dob: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
});

export default mongoose.model<IUser>("User", UserSchema);
