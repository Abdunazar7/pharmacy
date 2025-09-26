import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { District } from "./models/district.model";
import { DistrictService } from "./district.service";
import { DistrictController } from "./district.controller";
import { Pharmacy } from "../pharmacies/models/pharmacy.model";
import { Region } from "../region/models/region.model";

@Module({
  imports: [SequelizeModule.forFeature([District, Pharmacy, Region])],
  controllers: [DistrictController],
  providers: [DistrictService],
})
export class DistrictModule {}
