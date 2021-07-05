import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty()
    documentNumber: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    address: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;
}
