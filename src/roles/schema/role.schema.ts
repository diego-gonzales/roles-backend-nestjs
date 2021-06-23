import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type RoleDocument = Role & Document;

@Schema({
    timestamps: true,
    versionKey: false
})
export class Role {

    @Prop({ unique: true , trim: true, lowercase: true })
    name: string;

};

export const RoleSchema = SchemaFactory.createForClass(Role);
