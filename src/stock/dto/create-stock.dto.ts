import { IsInt, Min } from 'class-validator';

export class CreateStockDto {
  @IsInt()
  pharmacyId: number;

  @IsInt()
  medicineId: number;

  @IsInt()
  @Min(0)
  quantity: number;
}
