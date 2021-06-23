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

@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) {}


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
    const products =  await this.productsService.findAll();
    return {
      ok: true,
      products
    };
  };

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const productFound = await this.productsService.findOne(id);

      if (!productFound) throw new NotFoundException('Product does not exists');
  
      return {
        ok: true,
        product: productFound
      };

    } catch (error) {
      throw new NotFoundException('Product does not exists');
    };
  };

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      const updatedProduct = await this.productsService.update(id, updateProductDto);

      if (!updatedProduct) throw new NotFoundException('Product does not exists');
  
      return {
        ok: true,
        product: updatedProduct
      };

    } catch (error) {
      throw new NotFoundException('Product does not exists');
    };
  };

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deletedProduct = await this.productsService.remove(id);

      if (!deletedProduct) throw new NotFoundException('Product does not exists');

      return {
        ok: true,
        product: deletedProduct
      };

    } catch (error) {
      // Esto lo hice porque cuando ponemos un número que no es de la forma de un id de mongo sale error 500
      throw new NotFoundException('Product does not exists')
    };
  };

}
