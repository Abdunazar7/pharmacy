import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Pharmacy } from "./models/pharmacy.model";
import { CreatePharmacyDto } from "./dto/create-pharmacy.dto";
import { UpdatePharmacyDto } from "./dto/update-pharmacy.dto";
import { Region } from "../region/models/region.model";
import { District } from "../district/models/district.model";

@Injectable()
export class PharmaciesService {
  constructor(
    @InjectModel(Pharmacy) private readonly pharmacyModel: typeof Pharmacy,
    @InjectModel(Region) private readonly regionModel: typeof Region,
    @InjectModel(District) private readonly districtModel: typeof District
  ) {}

  async create(createPharmacyDto: CreatePharmacyDto): Promise<Pharmacy> {
    const { regionId, districtId } = createPharmacyDto;

    const region = await this.regionModel.findByPk(regionId);
    if (!region)
      throw new NotFoundException(`Region ${regionId} does not exist`);

    const district = await this.districtModel.findByPk(districtId);
    if (!district)
      throw new NotFoundException(`District ${districtId} does not exist`);

    return this.pharmacyModel.create(createPharmacyDto);
  }

  findAll() {
    return this.pharmacyModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const pharmacy = await this.pharmacyModel.findByPk(id, {
      include: { all: true },
    });
    if (!pharmacy) return { message: `Pharmacy ${id} not found` };
    return pharmacy;
  }

  async update(id: number, updatePharmacyDto: UpdatePharmacyDto) {
    const pharmacy = await this.pharmacyModel.update(updatePharmacyDto, {
      where: { id },
      returning: true,
    });
    return pharmacy[1][0];
  }

  async remove(id: number) {
    const delCount = await this.pharmacyModel.destroy({ where: { id } });
    if (delCount === 0) return { message: "No pharmacy found to delete." };
    return { message: "Pharmacy deleted successfully.", id };
  }
}
