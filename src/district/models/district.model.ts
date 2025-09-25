import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Region } from "../../region/models/region.model";

export interface DistrictCreationAttributes {
  name: string;
  region_id: number;
}

@Table({ tableName: "district", freezeTableName: true })
export class District extends Model<
  District,
  DistrictCreationAttributes
> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @ForeignKey(() => Region)
  @Column({ type: DataType.BIGINT, allowNull: false })
  declare region_id: number;

  @BelongsTo(() => Region)
  declare region: Region;
}
