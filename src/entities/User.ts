import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Asset } from './Asset';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @OneToMany(() => Asset, (asset) => asset.owner)
    assets: Asset[]

}
