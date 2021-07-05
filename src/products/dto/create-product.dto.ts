import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Min } from "class-validator";
import { Status } from './../../shared/enums/status.enum';
import { CreateCategoryDto } from '../../categories/dto/create-category.dto';

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    category: CreateCategoryDto;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsUrl()
    @IsOptional()
    imageURL: string;

    @IsInt()
    @Min(0)
    @IsNotEmpty()
    stock: number;

    @IsEnum(Status, { message: 'Status must be 0 or 1' })
    @IsOptional()
    status: Status;

}
