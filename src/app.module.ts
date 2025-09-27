import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { MedicineTypeModule } from './medicine_type/medicine_type.module';
import { MedicineModule } from './medicine/medicine.module';
import { Medicine } from './medicine/models/medicine.model';
import { Region } from './region/models/region.model';
import { District } from './district/models/district.model';
import { MedicineType } from './medicine_type/models/medicine_type.model';
import { PharmaciesModule } from './pharmacies/pharmacies.module';
import { StockModule } from './stock/stock.module';
import { Pharmacy } from './pharmacies/models/pharmacy.model';
import { Stock } from './stock/models/stock.model';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      models: [Medicine, Region, District, MedicineType, Pharmacy, Stock],
      autoLoadModels: true,
      logging: false,
      sync: { force: true },
    }),
    RegionModule,
    DistrictModule,
    MedicineTypeModule,
    MedicineModule,
    PharmaciesModule,
    StockModule,
    AdminModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
