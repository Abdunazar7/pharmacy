import { Table, Column, DataType, Model, HasMany } from "sequelize-typescript";
import { Medicine } from "../../medicine/models/medicine.model";

export interface MedicineTypeCreationAttributes {
  name: string;
}

@Table({ tableName: "medicineType", timestamps: false })
export class MedicineType extends Model<
  MedicineType,
  MedicineTypeCreationAttributes
> {
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @HasMany(() => Medicine)
  declare medicines: Medicine[];
}
