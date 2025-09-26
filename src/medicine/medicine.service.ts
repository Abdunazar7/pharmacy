import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Medicine } from "./models/medicine.model";
import { CreateMedicineDto } from "./dto/create-medicine.dto";
import { UpdateMedicineDto } from "./dto/update-medicine.dto";
import { MedicineType } from "../medicine_type/models/medicine_type.model";

@Injectable()
export class MedicineService {
  constructor(
    @InjectModel(Medicine) private readonly medicineModel: typeof Medicine,
    @InjectModel(MedicineType)
    private readonly medicineTypeModel: typeof MedicineType
  ) {}

  async create(createMedicineDto: CreateMedicineDto): Promise<Medicine> {
    const { medicine_typeId } = createMedicineDto;
    const type = await this.medicineTypeModel.findByPk(medicine_typeId);
    if (!type)
      throw new NotFoundException(
        `MedicineType ${medicine_typeId} does not exist`
      );

    return this.medicineModel.create(createMedicineDto);
  }

  findAll() {
    return this.medicineModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const medicine = await this.medicineModel.findByPk(id, {
      include: { all: true },
    });
    if (!medicine) return { message: `Medicine ${id} not found` };
    return medicine;
  }

  async update(id: number, updateMedicineDto: UpdateMedicineDto) {
    const medicine = await this.medicineModel.update(updateMedicineDto, {
      where: { id },
      returning: true,
    });
    return medicine[1][0];
  }

  async remove(id: number) {
    const delCount = await this.medicineModel.destroy({ where: { id } });
    if (delCount === 0) return { message: "No medicine found to delete." };
    return { message: "Medicine deleted successfully.", id };
  }
}
