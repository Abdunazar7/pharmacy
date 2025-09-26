import { Column, DataType, Model, Table, ForeignKey } from "sequelize-typescript";
import { Region } from "../../region/models/region.model";
import { District } from "../../district/models/district.model";
import { HasMany, BelongsTo } from "sequelize-typescript";
import { Stock } from "../../stock/models/stock.model";

interface IPharmacyCreationAttr {
    name: string;
    address: string;
    location: string;
    phone: string;
    email: string;
    regionId: number;
    districtId: number;
}

@Table({ tableName: "pharmacies", freezeTableName: true })
export class Pharmacy extends Model<Pharmacy, IPharmacyCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare address: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare location: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @ForeignKey(() => Region)
  @Column({ type: DataType.BIGINT })
  regionId: number;

  @ForeignKey(() => District)
  @Column({ type: DataType.BIGINT })
  districtId: number;

  @BelongsTo(() => Region)
  region: Region;

  @BelongsTo(() => District)
  district: District;

  @HasMany(() => Stock)
  stocks: Stock[];
}
