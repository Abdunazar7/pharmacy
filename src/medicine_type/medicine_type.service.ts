import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { MedicineType } from "./models/medicine_type.model";
import { CreateMedicineTypeDto } from "./dto/create-medicine_type.dto";
import { UpdateMedicineTypeDto } from "./dto/update-medicine_type.dto";

@Injectable()
export class MedicineTypeService {
  constructor(
    @InjectModel(MedicineType) private readonly typeModel: typeof MedicineType
  ) {}

  async create(
    createMedicineTypeDto: CreateMedicineTypeDto
  ): Promise<MedicineType> {
    const newType = await this.typeModel.create(createMedicineTypeDto);
    return newType;
  }

  findAll() {
    return this.typeModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const type = await this.typeModel.findByPk(id, { include: { all: true } });
    if (!type) throw new NotFoundException(`MedicineType ${id} not found`);
    return type;
  }

  async update(id: number, updateMedicineTypeDto: UpdateMedicineTypeDto) {
    const updated = await this.typeModel.update(updateMedicineTypeDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0];
  }

  async remove(id: number) {
    const type = await this.findOne(id);
    await type.destroy();
    return { message: "MedicineType deleted", id };
  }
}
