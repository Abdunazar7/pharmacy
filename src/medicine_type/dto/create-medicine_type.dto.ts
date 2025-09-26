import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMedicineTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
