import { Module } from '@nestjs/common';
import { PharmaciesService } from './pharmacies.service';
import { PharmaciesController } from './pharmacies.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pharmacy } from './models/pharmacy.model';
import { Region } from '../region/models/region.model';
import { District } from '../district/models/district.model';

@Module({
  imports: [SequelizeModule.forFeature([Pharmacy, Region, District])],
  controllers: [PharmaciesController],
  providers: [PharmaciesService],
  exports: [PharmaciesService],
})
export class PharmaciesModule {}
