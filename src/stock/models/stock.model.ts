import {
  Column,
  Model,
  DataType,
  Table,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Pharmacy } from "../../pharmacies/models/pharmacy.model";
import { Medicine } from "../../medicine/models/medicine.model";

interface IStockCreationAttr {
  pharmacyId: number;
  medicineId: number;
  quantity: number;
}

@Table({ tableName: "stocks", freezeTableName: true })
export class Stock extends Model<Stock, IStockCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Pharmacy)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare pharmacyId: number;

  @ForeignKey(() => Medicine)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare medicineId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare quantity: number;

  @BelongsTo(() => Pharmacy)
  pharmacy: Pharmacy;

  @BelongsTo(() => Medicine)
  medicine: Medicine;
}
