import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PurchaseRequest } from "./purchaserequest.entity";

@Entity({ name: "item" })

export class Item {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        nullable: false
    })
    name: string;

    @Column({
        nullable: false
    })
    category: string;

    @Column({
        nullable: false
    })
    stock: number;

    @Column()
    lastUpdated: Date;

    @OneToMany(() => PurchaseRequest, purchaseRequest => purchaseRequest.item)
    purchaseRequests: PurchaseRequest[];

}
