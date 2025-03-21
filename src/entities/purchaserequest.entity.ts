import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm";
import { Item } from "./item.entity";
import { ProcurementOrder } from "./procurementorder.entity";

@Entity({ name: "purchaserequest" })

export class PurchaseRequest {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        nullable: false
    })
    quantity: number;

    @Column({
        nullable: false
    })
    status: string;

    @Column({
        nullable: false
    })
    requestDate: Date;

    @ManyToOne(() => Item, item => item.id)
    item: Item;

    @OneToOne(() => ProcurementOrder, procurementOrder => procurementOrder.id)
    procurementOrder: ProcurementOrder;

}
