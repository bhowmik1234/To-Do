import mongoose, { Document, Model, Schema } from "mongoose";

// Interface for User Document (instance of User model)
interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

// Interface for User Model (static methods)
interface UserModel extends Model<UserDocument> {}

// Define user schema
const userSchema: Schema<UserDocument> = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        // required: true,
    },
}, { timestamps: true });

// Define and export User model
const User: UserModel = (mongoose.models.User as UserModel) || mongoose.model<UserDocument, UserModel>("User", userSchema);

export default User;
