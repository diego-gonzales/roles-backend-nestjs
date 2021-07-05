import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({
    timestamps: true,
    versionKey: false
})
export class Category {
    @Prop({ unique: true, required: true, trim: true })
    name: string;
};

export const CategorySchema = SchemaFactory.createForClass(Category);