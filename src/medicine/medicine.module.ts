import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Medicine } from "./models/medicine.model";
import { MedicineService } from "./medicine.service";
import { MedicineController } from "./medicine.controller";
import { Stock } from "../stock/models/stock.model";
import { MedicineType } from "../medicine_type/models/medicine_type.model";

@Module({
  imports: [SequelizeModule.forFeature([Medicine, Stock, MedicineType])],
  controllers: [MedicineController],
  providers: [MedicineService],
})
export class MedicineModule {}
