import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Medicine } from "./models/medicine.model";
import { MedicineService } from "./medicine.service";
import { MedicineController } from "./medicine.controller";

@Module({
  imports: [SequelizeModule.forFeature([Medicine])],
  controllers: [MedicineController],
  providers: [MedicineService],
})
export class MedicineModule {}
