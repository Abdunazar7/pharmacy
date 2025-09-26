import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsNumber,
  Min,
  IsDateString,
  IsOptional,
} from "class-validator";

export class CreateMedicineDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  manufacturer: string;

  @IsInt()
  medicine_typeId: number;

  @IsNumber()
  price: number;

  @IsDateString()
  expiry_date: Date;
  
  @IsString()
  info: string;
}
