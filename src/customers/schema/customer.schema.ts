import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';


export type CustomerDocument = Customer & Document;


@Schema({
    timestamps: true,
    versionKey: false
})
export class Customer {
    @Prop({ unique: true, required: true, trim: true })
    documentNumber: string;

    @Prop({ required: true, trim: true })
    name: string;

    @Prop({ trim: true,  })
    address: string;

    @Prop({ trim: true })
    phoneNumber: string;
};

export const CustomerSchema = SchemaFactory.createForClass(Customer);