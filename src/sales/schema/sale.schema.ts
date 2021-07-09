import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

import { Customer } from '../../customers/schema/customer.schema';
import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/schema/user.schema';


export type SaleDocument = Sale & Document;

@Schema({
    timestamps: true,
    versionKey: false
})
export class Sale {
    @Prop({ type:  mongoose.Schema.Types.ObjectId, ref: 'Customer', autopopulate: true })
    customer: Customer;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true })
    user: User;

    @Prop(raw([{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', autopopulate: true },
        quantity: { type: Number }
    }]))
    products: any;
    // products: Record<string, any>;
    // products: [{product: Product, quantity: number}];
    abc: string
    @Prop({ required: true })
    totalPrice: number;
};

export const SaleSchema = SchemaFactory.createForClass(Sale);