import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Medicine } from "./models/medicine.model";
import { CreateMedicineDto } from "./dto/create-medicine.dto";
import { UpdateMedicineDto } from "./dto/update-medicine.dto";

@Injectable()
export class MedicineService {
  constructor(@InjectModel(Medicine) private readonly medicineModel: typeof Medicine) {}

  async create(createMedicineDto: CreateMedicineDto): Promise<Medicine> {
    const newMedicine = await this.medicineModel.create(createMedicineDto);
    return newMedicine;
  }

  findAll() {
    return this.medicineModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const medicine = await this.medicineModel.findByPk(id, {
      include: { all: true },
    });
    if (!medicine) throw new NotFoundException(`Medicine ${id} not found`);
    return medicine;
  }

  async update(id: number, updateMedicineDto: UpdateMedicineDto) {
    const updated = await this.medicineModel.update(updateMedicineDto, {
      where: { id },
      returning: true,
    });
    return { message: "Medicine updated", medicine: updated[1][0] };
  }

  async remove(id: number) {
    const medicine = await this.findOne(id);
    await medicine.destroy();
    return { message: "Medicine deleted", id };
  }
}
