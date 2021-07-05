import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Public } from './../shared/custom-decorators/public.decorator';
import { Roles } from './../shared/custom-decorators/roles.decorator';

@Controller('customers')
export class CustomersController {

  constructor(private readonly customersService: CustomersService) {}


  @Roles('moderator', 'admin')
  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const createdCustomer = await this.customersService.create(createCustomerDto);
    return {
      ok: true,
      customer: createdCustomer
    };
  };

  @Public()
  @Get()
  async findAll() {
    const customers = await this.customersService.findAll();
    return {
      ok: true,
      customers
    };
  };

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const customer = await this.customersService.findOne(id);
    return {
      ok: true,
      customer
    };
  };

  @Roles('admin')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    const updatedCustomer = await this.customersService.update(id, updateCustomerDto);
    return {
      ok: true,
      customer: updatedCustomer
    };
  };

  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedCustomer = await this.customersService.remove(id);
    return {
      ok: true,
      customer: deletedCustomer
    };
  };
}
