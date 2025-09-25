import { Table, Column, DataType, Model, HasMany } from "sequelize-typescript";
import { District } from "../../district/models/district.model";

export interface RegionCreationAttributes {
  name: string;
}

@Table({ tableName: "region", freezeTableName: true })
export class Region extends Model<Region, RegionCreationAttributes> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @HasMany(() => District)
  declare districts: District[];
}
