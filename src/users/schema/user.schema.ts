import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Role } from '../../roles/schema/role.schema';


export type UserDocument = User & Document;

@Schema({
    timestamps: true,
    versionKey: false
})
export class User {

    @Prop({ unique: true, required: true, trim: true })
    username: string;

    @Prop({ unique: true, required: true, trim: true })
    email: string;

    @Prop({ required: true, minlength: 6 })
    password: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role', autopopulate: true }] })
    roles: Role[];

};


export const UserSchema = SchemaFactory.createForClass(User);