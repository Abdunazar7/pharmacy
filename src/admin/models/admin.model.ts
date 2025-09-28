import {
  Model,
  Table,
  DataType,
  Column,
} from "sequelize-typescript";

interface IAdmincreationAttr {
  name: string;
  email: string;
  password: string;
}

@Table({ tableName: "admins", freezeTableName: true })
export class Admin extends Model<Admin, IAdmincreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    defaultValue: false,
  })
  declare is_acive: boolean;
}
