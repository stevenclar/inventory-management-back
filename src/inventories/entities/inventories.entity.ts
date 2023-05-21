import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Product } from 'src/products/entities/products.entity';
import { Company } from 'src/companies/entities/companies.entity';

@Entity()
export class Inventory extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string | null;

  @Index()
  @Column({ type: 'numeric' })
  availableQuantity: number | null;

  @ManyToOne(() => Product, {
    eager: true,
  })
  product?: Product | null;

  @ManyToOne(() => Company)
  company?: Company | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
