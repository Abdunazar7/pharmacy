import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { District } from "./models/district.model";
import { DistrictService } from "./district.service";
import { DistrictController } from "./district.controller";

@Module({
  imports: [SequelizeModule.forFeature([District])],
  controllers: [DistrictController],
  providers: [DistrictService],
})
export class DistrictModule {}
