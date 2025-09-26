import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Region } from "../../region/models/region.model";
import { Pharmacy } from "../../pharmacies/models/pharmacy.model";

export interface DistrictCreationAttributes {
  name: string;
  regionId: number;
}

@Table({ tableName: "district", freezeTableName: true })
export class District extends Model<District, DistrictCreationAttributes> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @ForeignKey(() => Region)
  @Column({ type: DataType.BIGINT, allowNull: false, onDelete: "CASCADE" })
  declare regionId: number;

  @BelongsTo(() => Region)
  region: Region;

  @HasMany(() => Pharmacy)
  pharmacies: Pharmacy[];
}
