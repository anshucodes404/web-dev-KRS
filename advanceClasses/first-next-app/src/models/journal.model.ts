import mongoose, { Schema, Document } from "mongoose";

export interface IJournal extends Document { 
//Extending document to get access to _id and __v but not recommended by monggose rather use hydratedDocument while exporting
  userId: Schema.Types.ObjectId;
  title: string;
  mood: string;
  content: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const journalSchema: Schema<IJournal> = new Schema(
  {
    userId: {type: Schema.Types.ObjectId, ref: "User"},
    title: { type: String, required: true },
    mood: { type: String, enum:["happy", "sad", "neytral", "angry", "awesome", "tired", "confused", "scared"] },
    content: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const Journal = (mongoose.models.Journal as mongoose.Model<IJournal>) || (mongoose.model("Journal", journalSchema))

export default Journal

//export default mongoose.models.Journal || mongoose.model("Journal", journalSchema) can also do this