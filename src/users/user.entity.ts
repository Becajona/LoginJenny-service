import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {hash} from 'bcrypt';
//import { Entity } from "typeorm";
//esta haciendo referencia a una tabla de la bd
@Entity({name:'users'})//aqui especificamos el nombre de la tabla
export class User{

//Esto lo genera nest.Js con TypeOrm

@PrimaryGeneratedColumn()
id:number;

@Column()
name:string;

@Column()
lastname:string;

@Column({unique:true})
email:string;

@Column({unique:true})
phone:string;

@Column({nullable:true})
image:string;

@Column()
password:string;

@Column({nullable:true})
notification_token:string;

@Column({type: 'datetime',default: ()=> 'CURRENT_TIMESTAMP'})
created_at:Date;

@Column({type: 'datetime',default: ()=> 'CURRENT_TIMESTAMP'})
updated_at:Date;

@BeforeInsert()//Método asincrono que se encarga de la encryptación
async hashPassword(){
    this.password=await hash(this.password,Number(process.env.HASH_SALT));
}

}