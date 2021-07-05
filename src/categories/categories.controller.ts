import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Public } from '../shared/custom-decorators/public.decorator';
import { Roles } from '../shared/custom-decorators/roles.decorator';

@Controller('categories')
export class CategoriesController {

  constructor(private readonly categoriesService: CategoriesService) {}

  @Roles('moderator', 'admin')
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoriesService.create(createCategoryDto);

    return {
      ok: true,
      category
    };
  };

  @Public()
  @Get()
  async findAll() {
    const categories = await this.categoriesService.findAll();

    return {
      ok: true,
      categories
    };
  };

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoriesService.findOne(id);

    return {
      ok: true,
      category
    };
  };

  @Roles('admin')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesService.update(id, updateCategoryDto);

    return {
      ok: true,
      category
    };
  };

  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const category = await this.categoriesService.remove(id);

    return {
      ok: true,
      category
    };
  };

}
