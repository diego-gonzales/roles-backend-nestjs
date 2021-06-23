import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsUrl()
    imageURL: string;
}
