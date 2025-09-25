import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { District } from "./models/district.model";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District) private readonly districtModel: typeof District
  ) {}

  async create(createDistrictDto: CreateDistrictDto): Promise<District> {
    const newDistrict = await this.districtModel.create(createDistrictDto);
    return newDistrict;
  }

  findAll() {
    return this.districtModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const district = await this.districtModel.findByPk(id, {
      include: { all: true },
    });
    if (!district) throw new NotFoundException(`District ${id} not found`);
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
    const district = await this.findOne(id);
    await district.destroy();
    return { message: "District deleted", id };
  }
}
