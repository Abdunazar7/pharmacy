import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Stock } from "./models/stock.model";
import { CreateStockDto } from "./dto/create-stock.dto";
import { UpdateStockDto } from "./dto/update-stock.dto";
import { Pharmacy } from "../pharmacies/models/pharmacy.model";
import { Medicine } from "../medicine/models/medicine.model";

@Injectable()
export class StockService {
  constructor(
    @InjectModel(Stock) private readonly stockModel: typeof Stock,
    @InjectModel(Pharmacy) private readonly pharmacyModel: typeof Pharmacy,
    @InjectModel(Medicine) private readonly medicineModel: typeof Medicine
  ) {}

  async create(createStockDto: CreateStockDto): Promise<Stock> {
    const { pharmacyId, medicineId } = createStockDto;

    const pharmacy = await this.pharmacyModel.findByPk(pharmacyId);
    if (!pharmacy)
      throw new NotFoundException(`Pharmacy ${pharmacyId} does not exist`);

    const medicine = await this.medicineModel.findByPk(medicineId);
    if (!medicine)
      throw new NotFoundException(`Medicine ${medicineId} does not exist`);

    return this.stockModel.create(createStockDto);
  }

  findAll() {
    return this.stockModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const stock = await this.stockModel.findByPk(id, {
      include: { all: true },
    });
    if (!stock) return { message: `Stock ${id} not found` };
    return stock;
  }

  async update(id: number, updateStockDto: UpdateStockDto) {
    const stock = await this.stockModel.update(updateStockDto, {
      where: { id },
      returning: true,
    });
    return stock[1][0];
  }

  async remove(id: number) {
    const delCount = await this.stockModel.destroy({ where: { id } });
    if (delCount === 0) return { message: "No stock found to delete." };
    return { message: "Stock deleted successfully.", id };
  }
}
