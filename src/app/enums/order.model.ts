import {
  AutoIncrement, BeforeCreate, BelongsTo, BelongsToMany,
  Column,
  DataType, Default, ForeignKey, HasMany, HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique
} from "sequelize-typescript";
import { Helpers } from "../util/helpers.util";
import { User } from "./user.model";
import { Employee } from "./employee.model";
import { isNullOrUndefined } from "util";
import { PaymentStatus } from "../enums/payment-status.enum";
import { OrderStatus } from "../enums/order-status.enum";
import { Cart } from "./cart.model";
import { CompactProduct } from "./compact-product.model";

@Table({
  timestamps: true,
  paranoid  : false,
  tableName : "orders"
})
export class Order extends Model<Order> {
  @Unique
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @Unique
  @Column(DataType.BIGINT)
  order_id: number;

  @ForeignKey(() => User)
  @Column(DataType.BIGINT)
  user_id: number;

  @ForeignKey(() => Cart)
  @Column(DataType.BIGINT)
  cart_id: number;

  @Column({
    type: DataType.JSON,
    set : function (this: Cart, value: number[]) {
      this.setDataValue("products", JSON.stringify(value || []));
    },
    get : function (this: Cart) {
      const value = this.getDataValue("products");
      if (isNullOrUndefined(value)) {
        return [];
      }
      return JSON.parse(value);
    }
  })
  products: CompactProduct[];

  @Column(DataType.FLOAT)
  amount: number;

  @Column(DataType.FLOAT)
  delivery_charge: number;

  @Column(DataType.STRING)
  delivery_address: string;

  @Column(DataType.STRING)
  latitude?: string;

  @Column(DataType.STRING)
  longitude?: string;

  @ForeignKey(() => Employee)
  @Column(DataType.BIGINT)
  employee_id?: number;

  @Column(DataType.STRING)
  delivery_code?: string;

  @Column(DataType.ENUM({values: Helpers.iterateEnum<PaymentStatus>(PaymentStatus)}))
  payment_status: PaymentStatus;

  @Column(DataType.ENUM({values: Helpers.iterateEnum<OrderStatus>(OrderStatus)}))
  order_status: OrderStatus;

  @Column({
    type: DataType.JSON,
    set : function (this: Cart, value: number[]) {
      this.setDataValue("pending_products", JSON.stringify(value || []));
    },
    get : function (this: Cart) {
      const value = this.getDataValue("pending_products");
      if (isNullOrUndefined(value)) {
        return [];
      }
      return JSON.parse(value);
    }
  })
  pending_products: CompactProduct[];

  @Column(DataType.DATEONLY)
  expected_date?: Date;

  @Column(DataType.STRING)
  invoice_url?: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Employee)
  employee: Employee;

}
