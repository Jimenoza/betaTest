import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from './User';

@Entity()
export class Asset {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    value: number

    @Column("text")
    description: string

    @ManyToOne(() => User, (user) => user.assets)
    owner: User

}
