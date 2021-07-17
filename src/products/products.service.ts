import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schema/product.schema';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {

  constructor( @InjectModel(Product.name) private productModel: Model<ProductDocument>,
               private categoriesService: CategoriesService ) { }


  async create(createProductDto: CreateProductDto) {
    const createdProduct = new this.productModel(createProductDto);
    // Buscamos que exista la categoría proveida en la coleccion 'Categories'
    const categoryFound = await this.categoriesService.findCategoryByName(createProductDto.category)
    if (!categoryFound) throw new BadRequestException('Provided category does not exists');

    createdProduct.category = categoryFound._id;

    return createdProduct.save();
  };

  async findAll() {
    return this.productModel.find().exec();
  };

  async findOne(id: string) {
    try {
      const productFound = await this.productModel.findById(id);
      if (!productFound) throw new NotFoundException('Product does not exists');

      return productFound;

    } catch (error) {
      throw new NotFoundException('Product does not exists');
    };
  };

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      if (updateProductDto.category) {
        const categoryFound = await this.categoriesService.findCategoryByName(updateProductDto.category);
        // if (!categoryFound) throw new NotFoundException('Provided category does not exists');
        updateProductDto.category = categoryFound._id;
      };

      const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });
      if (!updatedProduct) throw new NotFoundException('Product does not exists');

      return updatedProduct;

    } catch (error) {
      throw error;
    };
  };

  /* Metodo que me actualiza el stock de un producto al hacer una venta
   (ver metodo create de SalesService, allí se usa este metodo)*/
  async updateProductStock(idProduct: string, quantityToSale: number) {
    try {
      const product = await this.productModel.findById(idProduct);

      if (!product) throw new NotFoundException('Product does not exists');
      if (product.stock < quantityToSale) throw new BadRequestException('Not enough stock');

      const newStock = product.stock - quantityToSale;

      await this.update(idProduct, { stock: newStock } );

    } catch (error) {
      throw error;
    };
  };

  async remove(id: string) {
    try {
      const deletedProduct = await this.productModel.findByIdAndDelete(id);
  
      if (!deletedProduct) throw new NotFoundException('Product does not exists');
  
      return deletedProduct;
      
    } catch (error) {
      throw error;
    };
  };
}
