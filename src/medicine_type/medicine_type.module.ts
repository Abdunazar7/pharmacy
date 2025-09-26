import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { MedicineType } from "./models/medicine_type.model";
import { MedicineTypeService } from "./medicine_type.service";
import { MedicineTypeController } from "./medicine_type.controller";
import { Medicine } from "../medicine/models/medicine.model";

@Module({
  imports: [SequelizeModule.forFeature([MedicineType, Medicine])],
  controllers: [MedicineTypeController],
  providers: [MedicineTypeService],
})
export class MedicineTypeModule {}
