import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Region } from "./models/region.model";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region) private readonly regionModel: typeof Region
  ) {}

  create(createRegionDto: CreateRegionDto) {
    return this.regionModel.create(createRegionDto);
  }

  findAll() {
    return this.regionModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const region = await this.regionModel.findByPk(id, {
      include: { all: true },
    });
    if (!region) return { message: `Region ${id} not found` };
    return region;
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const region = await this.regionModel.update(updateRegionDto, {
      where: { id },
      returning: true,
    });
    return region[1][0];
  }

  async remove(id: number) {
    const delCount = await this.regionModel.destroy({ where: { id } });
    if (delCount === 0) return { message: "No region found to delete." };
    return { message: "Region deleted successfully.", id };
  }
}
