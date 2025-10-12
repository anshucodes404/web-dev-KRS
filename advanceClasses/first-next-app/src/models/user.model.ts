import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document{
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
}

export const userSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

// userSchema.methods.isPasswordCorrect = async function(password: string): Promise<boolean>{
//     return await bcrypt.compare(password, this.password)
// }


const User = (mongoose.models.User as mongoose.Model<IUser>) || (mongoose.model("User", userSchema))

export default User