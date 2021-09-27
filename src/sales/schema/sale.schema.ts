import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

import { Customer } from '../../customers/schema/customer.schema';
import { User } from '../../users/schema/user.schema';


export type SaleDocument = Sale & Document;

@Schema({
    timestamps: true,
    versionKey: false
})
export class Sale {
    // por defecto le habia puesto el id del customer 'General Public' pero no es conveniente si cambia ese id, mejor lo hice en el servicio
    // de 'sales' le agregué una condición por si se manda un customer vacio
    @Prop({ type:  mongoose.Schema.Types.ObjectId, ref: 'Customer', autopopulate: true })
    customer: Customer;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true })
    user: User;

    @Prop(raw([{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', autopopulate: true },
        quantity: { type: Number, default: 0 }
    }]))
    products: any;
    // products: Record<string, any>;
    // products: [{product: Product, quantity: number}];
    @Prop({ required: true })
    totalPrice: number;
};

export const SaleSchema = SchemaFactory.createForClass(Sale);