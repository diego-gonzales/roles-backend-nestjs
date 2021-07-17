import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

interface ProductElement {
    product: string;
    quantity: number;
}
export class CreateSaleDto {
    @IsMongoId()
    @IsOptional()
    customer: any; // id del producto

    @IsMongoId()
    @IsNotEmpty()
    user: any; // id del usuario

    @IsNotEmpty()
    @IsArray({message: 'products must be an array of type [{product mongoID, quantity}]'})
    products: ProductElement[]; // [ product: ObjectId de Product, quantity: Number]

    // @IsNotEmpty()
    // @IsArray({message: 'products must be an array of mongoID'})
    // products: any []; // array de ids de los productos

    @IsNumber()
    @IsNotEmpty()
    totalPrice: number;
}
