import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('specialty')
@Unique(['id', 'nome'])
export class Specialty extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Nome da especialidade
  @Column({ nullable: false, type: 'varchar', length: 255 })
  nome: string;

  @CreateDateColumn()
  @Exclude({ toPlainOnly: true })
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude({ toPlainOnly: true })
  updatedAt: Date;
}
