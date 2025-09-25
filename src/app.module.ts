import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { MedicineTypeModule } from './medicine_type/medicine_type.module';
import { MedicineModule } from './medicine/medicine.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      models: [],
      autoLoadModels: true,
      logging: true,
      sync: { alter: true },
    }),
    RegionModule,
    DistrictModule,
    MedicineTypeModule,
    MedicineModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
