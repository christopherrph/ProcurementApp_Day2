import { Entity, Column, PrimaryGeneratedColumn  } from "typeorm";
import { nullable } from "zod";

@Entity({ name: "user" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        nullable: false
    })
    name: string;

    @Column({
        nullable: false
    })
    email: string;

    @Column({
        nullable: false
    })
    password: string;

    @Column({
        type: "enum",
        enum: ["ADMIN", "USER", "MANAGER"],
        default: "USER"
    })
    role: string;

    @Column()
    lastUpdated: Date;

    @Column({
        nullable: true
    })
    avatar?: string;
}