import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale, SaleDocument } from './schema/sale.schema';


@Injectable()
export class SalesService {

  constructor(@InjectModel(Sale.name) private saleModel: Model<SaleDocument>) { }


  async create(createSaleDto: CreateSaleDto) {
    try {
      return await new this.saleModel(createSaleDto).save();
    } catch (error) {
      throw error;
    };
  };

  async findAll() {
    try {
      return this.saleModel.find().exec();
    } catch (error) {
      throw error;
    };
  };

  async findOne(id: string) {
    try {
      const sale = await this.saleModel.findById(id);

      if (!sale) throw new Error();

      return sale;

    } catch (error) {
      throw new NotFoundException('Sale does not exists');
    };
  };

  async update(id: string, updateSaleDto: UpdateSaleDto) {
    try {
      const updatedSale = await this.saleModel.findByIdAndUpdate(id, updateSaleDto, { new: true });

      if (!updatedSale) throw new NotFoundException('Sale does not exists');

      return updatedSale;

    } catch (error) {
      throw error;
    };
  };

  async remove(id: string) {
    try {
      const deletedSale = await this.saleModel.findByIdAndDelete(id);

      if (!deletedSale) throw new Error();

      return deletedSale;

    } catch (error) {
      throw new NotFoundException('Sale does not exists');
    };
  };
}
