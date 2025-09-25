import { Module } from '@nestjs/common';
import { MedicineTypeService } from './medicine_type.service';
import { MedicineTypeController } from './medicine_type.controller';

@Module({
  controllers: [MedicineTypeController],
  providers: [MedicineTypeService],
})
export class MedicineTypeModule {}
