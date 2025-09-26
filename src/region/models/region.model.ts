import { Table, Column, DataType, Model, HasMany } from "sequelize-typescript";
import { District } from "../../district/models/district.model";
import { Pharmacy } from "../../pharmacies/models/pharmacy.model";

export interface RegionCreationAttributes {
  name: string;
}

@Table({ tableName: "region", freezeTableName: true })
export class Region extends Model<Region, RegionCreationAttributes> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @HasMany(() => Pharmacy)
  pharmacies: Pharmacy[];

  @HasMany(() => District)
  districts: District[];
}
