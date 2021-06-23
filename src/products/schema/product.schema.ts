import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({
    timestamps: true,
    versionKey: false
})
export class Product {

    @Prop({ required: true, trim: true })
    name: string;

    @Prop({ required: true, trim: true })
    category: string;

    @Prop({ required: true })
    price: number;

    @Prop({ trim: true })
    imageURL: string;
};

export const ProductSchema = SchemaFactory.createForClass(Product);
