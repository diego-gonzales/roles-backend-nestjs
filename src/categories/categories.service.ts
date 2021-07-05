import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schema/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {

  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) { }


  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const createdCategory = await new this.categoryModel(createCategoryDto).save();
      // if(!createdCategory) throw new BadRequestException('Category has already been registered');
      return createdCategory;

    } catch (error) {
      // Este error se dispara cuando creamos una categoria que ya existe, porque tenemos
      // 'unique' en nuestro esquema
      throw new BadRequestException('Category has already been registered');
    };
  };

  async findAll() {
    return this.categoryModel.find().exec();
  };

  async findOne(id: string) {
    try {
      const categoryFound = await this.categoryModel.findById(id);

      if (!categoryFound) throw new Error();

      return categoryFound;

    } catch (error) {
      throw new NotFoundException('Category does not exists');
    };
  };

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const updatedCategory = await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, {new: true} );

      if (!updatedCategory) throw new Error();

      return updatedCategory;

    } catch (error) {
      throw new NotFoundException('Category does not exists');
    };
  };

  async remove(id: string) {
    try {
      const deletedCategory = await this.categoryModel.findByIdAndDelete(id);

      if (!deletedCategory) throw new Error();

      return deletedCategory;

    } catch (error) {
      throw new NotFoundException('Category does not exists');
    };
  };

  // Metodo que me servirá para encontrar una categoría que coincida con la enviada por un usuario
  // al crear un producto nuevo, para luego su id sea guardado en un 'Product'
  async findCategoryByName(categoryName: any) {
    return this.categoryModel.findOne({ name: categoryName });
  };
};
