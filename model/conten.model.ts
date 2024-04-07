import mongoose, { Document, Schema, Types, Model } from "mongoose";

interface UserContent extends Document {
    content: string;
    user: Types.ObjectId;
}

interface ContentModel extends Model<UserContent>{}

const contentSchema: Schema<UserContent> = new Schema<UserContent>(
    {
        content: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

export const Content = (mongoose.models.Content as ContentModel) || mongoose.model<UserContent, ContentModel>("Content", contentSchema);
