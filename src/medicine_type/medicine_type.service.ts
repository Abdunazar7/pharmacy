import { Injectable } from '@nestjs/common';
import { CreateMedicineTypeDto } from './dto/create-medicine_type.dto';
import { UpdateMedicineTypeDto } from './dto/update-medicine_type.dto';

@Injectable()
export class MedicineTypeService {
  create(createMedicineTypeDto: CreateMedicineTypeDto) {
    return 'This action adds a new medicineType';
  }

  findAll() {
    return `This action returns all medicineType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicineType`;
  }

  update(id: number, updateMedicineTypeDto: UpdateMedicineTypeDto) {
    return `This action updates a #${id} medicineType`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicineType`;
  }
}
