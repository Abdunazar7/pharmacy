import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { District } from "./models/district.model";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { Region } from "../region/models/region.model";

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District) private readonly districtModel: typeof District,
    @InjectModel(Region) private readonly regionModel: typeof Region
  ) {}

  async create(createDistrictDto: CreateDistrictDto): Promise<District> {
    const { regionId } = createDistrictDto;
    const region = await this.regionModel.findByPk(regionId);
    if (!region)
      throw new NotFoundException(`Region ${regionId} does not exist`);

    return this.districtModel.create(createDistrictDto);
  }

  findAll() {
    return this.districtModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const district = await this.districtModel.findByPk(id, {
      include: { all: true },
    });
    if (!district) return { message: `District ${id} not found` };
    return district;
  }

  async update(id: number, updateDistrictDto: UpdateDistrictDto) {
    const district = await this.districtModel.update(updateDistrictDto, {
      where: { id },
      returning: true,
    });
    return district[1][0];
  }

  async remove(id: number) {
    const delCount = await this.districtModel.destroy({ where: { id } });
    if (delCount === 0) return { message: "No district found to delete." };
    return { message: "District deleted successfully.", id };
  }
}
