import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import { PurchaseRequest } from "./purchaserequest.entity";

@Entity({ name: "procurementorder" })

export class ProcurementOrder {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        nullable: false
    })
    supplier: string;

    @Column({
        nullable: false
    })
    status: string;

    @Column()
    orderDate: Date;

    @OneToOne(() => PurchaseRequest, purchaseRequest => purchaseRequest.item)
    purchaseRequests: PurchaseRequest;

}
