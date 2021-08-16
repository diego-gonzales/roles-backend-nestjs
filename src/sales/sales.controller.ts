import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Public } from 'src/shared/custom-decorators/public.decorator';
import { Roles } from 'src/shared/custom-decorators/roles.decorator';

@Controller('sales')
export class SalesController {

  constructor(private readonly salesService: SalesService) {}


  @Roles('user', 'moderator', 'admin')
  @Post()
  async create(@Body() createSaleDto: CreateSaleDto) {
    const sale = await this.salesService.create(createSaleDto);
    return {
      ok: true,
      sale
    };
  };

  @Public()
  @Get()
  async findAll() {
    const sales = await this.salesService.findAll();
    return {
      ok: true,
      sales
    };
  };

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const sale = await this.salesService.findOne(id);
    return {
      ok: true,
      sale
    };
  };

  @Roles('admin')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    const sale = await this.salesService.update(id, updateSaleDto);
    return {
      ok: true,
      sale
    };
  };

  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const sale = await this.salesService.remove(id);
    return {
      ok: true,
      sale
    };
  };

}
