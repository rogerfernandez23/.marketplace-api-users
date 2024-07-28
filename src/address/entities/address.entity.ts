import { IsNotEmpty, Length, isNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from 'src/users/entities/user.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  street: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  numberHouse: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  city: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  state: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @Length(8)
  postalCode: string;

  @Column({ nullable: true })
  complement?: string;

  @Column({ nullable: true })
  additionalInfo?: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @ManyToOne(() => Users, (user) => user.addresses)
  user: Users;
}
