import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsInt,
  IsPhoneNumber,
} from "class-validator";

export class CreatePharmacyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  address: string;

  @IsString()
  location: string;

  @IsPhoneNumber("UZ")
  phone: string;

  @IsEmail()
  email: string;

  @IsInt()
  regionId: number;
  
  @IsInt()
  districtId: number;
}
