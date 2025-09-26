import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { MedicineType } from "./models/medicine_type.model";
import { CreateMedicineTypeDto } from "./dto/create-medicine_type.dto";
import { UpdateMedicineTypeDto } from "./dto/update-medicine_type.dto";

@Injectable()
export class MedicineTypeService {
  constructor(
    @InjectModel(MedicineType)
    private readonly medicineTypeModel: typeof MedicineType
  ) {}

  create(createMedicineTypeDto: CreateMedicineTypeDto) {
    return this.medicineTypeModel.create(createMedicineTypeDto);
  }

  findAll() {
    return this.medicineTypeModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const type = await this.medicineTypeModel.findByPk(id, {
      include: { all: true },
    });
    if (!type) return { message: `MedicineType ${id} not found` };
    return type;
  }

  async update(id: number, updateMedicineTypeDto: UpdateMedicineTypeDto) {
    const type = await this.medicineTypeModel.update(updateMedicineTypeDto, {
      where: { id },
      returning: true,
    });
    return type[1][0];
  }

  async remove(id: number) {
    const delCount = await this.medicineTypeModel.destroy({ where: { id } });
    if (delCount === 0) return { message: "No medicine type found to delete." };
    return { message: "Medicine type deleted successfully.", id };
  }
}
