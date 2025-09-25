import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { MedicineType } from "../../medicine_type/models/medicine_type.model";

export interface MedicineCreationAttributes {
  name: string;
  manufacturer: string;
  medicine_type_id: number;
  price: number;
  expiry_date: Date;
  info: string;
}

@Table({ tableName: "medicines", timestamps: false })
export class Medicine extends Model<
  Medicine,
  MedicineCreationAttributes
> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare manufacturer: string;

  @ForeignKey(() => MedicineType)
  @Column({ type: DataType.BIGINT, allowNull: false })
  declare medicine_type_id: number;

  @BelongsTo(() => MedicineType)
  declare medicineType: MedicineType;

  @Column({ type: DataType.FLOAT, allowNull: false })
  declare price: number;

  @Column({ type: DataType.DATE, allowNull: false })
  declare expiry_date: Date;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare info: string;
}
