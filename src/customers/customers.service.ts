import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer, CustomerDocument } from './schema/customer.schema';

@Injectable()
export class CustomersService {

  constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument>) { }


  async create(createCustomerDto: CreateCustomerDto) {
    return await new this.customerModel(createCustomerDto).save();
  };

  async findAll() {
    return this.customerModel.find().exec();
  };

  async findOne(id: string) {
    try {
      const customer = await this.customerModel.findById(id);

      if (!customer) throw new Error();

      return customer;

    } catch (error) {
      throw new NotFoundException('Customer does not exists');
    };
  };

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    try {
      const customer = await this.customerModel.findByIdAndUpdate(id, updateCustomerDto, { new: true });

      if (!customer) throw new Error();

      return customer;

    } catch (error) {
      throw new NotFoundException('Customer does not exits');
    };
  };

  async remove(id: string) {
    try {
      const customer = await this.customerModel.findByIdAndDelete(id);
  
      if (!customer) throw new Error();
  
      return customer;

    } catch (error) {
      throw new NotFoundException('Customer does not exists');
    };
  };

  async createDefaultCustomer() {
    try {
      const totalCustomers = await this.customerModel.estimatedDocumentCount();

      if (totalCustomers > 0) {
        console.log('There are already customers');
        return;
      }

      await new this.customerModel({
        documentNumber: '00000',
        name: 'General Public',
        address: '00000',
        phoneNumber: '00000'
      }).save();

      console.log('Default customer has been created');

    } catch (error) {
      console.log(error);
    };
  };

  async getDefaultCustomerID() {
    try {
      const defaultCustomer = await this.customerModel.findOne({ name: 'General Public' });
      return defaultCustomer.id;

    } catch (error) {
      console.log(error);
    };
  };
}
