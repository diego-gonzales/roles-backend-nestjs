import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { Category } from '../../categories/entities/category.entity';
import { Status } from './../../shared/enums/status.enum';


export type ProductDocument = Product & Document;

@Schema({
    timestamps: true,
    versionKey: false
})
export class Product {

    @Prop({ required: true, trim: true })
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category', autopopulate: true })
    category: Category;

    @Prop({ required: true })
    price: number;

    @Prop({ trim: true })
    imageURL: string;

    @Prop({ required: true })
    stock: number;

    @Prop({ default: Status.Active })
    status: Status;
};

export const ProductSchema = SchemaFactory.createForClass(Product);
