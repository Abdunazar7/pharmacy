import { IsInt, IsString, IsNotEmpty } from "class-validator";

export class CreateDistrictDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  regionId: number;
}
