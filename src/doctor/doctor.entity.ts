import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Specialty } from './../specialty/specialty.entity';

@Entity('doctor')
@Unique(['id', 'crm'])
export class Doctor extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Nome do médico com no máximo 120 caractéres
  @Column({ nullable: false, type: 'varchar', length: 120 })
  nome: string;

  //only numbers
  @Column({ nullable: false, type: 'varchar', length: 7 })
  crm: string;

  //only numbers
  @Column({ nullable: false, type: 'varchar', length: 13 })
  telefone_fixo: string;

  //only numbers
  @Column({ nullable: true, type: 'varchar', length: 13 })
  telefone_celular: string;

  //only numbers
  @Column({ nullable: false, type: 'varchar', length: 8 })
  cep: string;

  @Column({ nullable: true, type: 'varchar' })
  logradouro: string;

  @Column({ nullable: true, type: 'varchar' })
  complemento: string;

  @Column({ nullable: true, type: 'varchar' })
  bairro: string;

  @Column({ nullable: true, type: 'varchar' })
  cidade: string;

  @Column({ nullable: true, type: 'varchar' })
  estado: string;

  @Column({ nullable: true, type: 'varchar' })
  ibge: string;

  @Column({ nullable: true, type: 'varchar' })
  gia: string;

  @Column({ nullable: true, type: 'varchar' })
  ddd: string;

  @Column({ nullable: true, type: 'varchar' })
  siafi: string;

  @ManyToMany(() => Specialty)
  @JoinTable()
  especialidades: Specialty[];

  @CreateDateColumn()
  @Exclude({ toPlainOnly: true })
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude({ toPlainOnly: true })
  updatedAt: Date;

  @DeleteDateColumn()
  @Exclude({ toPlainOnly: true })
  deletedAt?: Date;
}
