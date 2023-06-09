import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Inventory } from 'src/inventories/entities/inventories.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Company extends EntityHelper {
  @ApiProperty({ example: '12345-6' })
  @PrimaryColumn()
  nit: string;

  @Index()
  @Column({ type: String, nullable: true })
  name: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  address: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  phone: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string | null;

  @OneToMany(() => Inventory, (inventory) => inventory.company, { eager: true })
  inventories?: Inventory[];

  @ManyToOne(() => User, {
    eager: true,
  })
  user?: User | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
