import { Controller,
         Get,
         Post,
         Body,
         Patch,
         Param,
         Delete,
         NotFoundException,
       } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Public } from './../shared/custom-decorators/public.decorator';
import { Roles } from '../shared/custom-decorators/roles.decorator';

@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) {}

  @Roles('moderator', 'admin')
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const createdProduct = await this.productsService.create(createProductDto);
    return {
      ok: true,
      product: createdProduct
    };
  };

  @Public()
  @Get()
  async findAll() {
    const products = await this.productsService.findAll();
    return {
      ok: true,
      products
    };
  };

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const productFound = await this.productsService.findOne(id);
    return {
      ok: true,
      product: productFound
    };
  };

  @Roles('admin')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.productsService.update(id, updateProductDto);
    return {
      ok: true,
      product: updatedProduct
    };
  };

  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedProduct = await this.productsService.remove(id);
    return {
      ok: true,
      product: deletedProduct
    };
  };

}
