import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { Address } from 'src/modules/address/entities/address.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  firstName: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  lastName: string;

  @Column({ type: 'enum', enum: ['male', 'female'], nullable: false })
  @IsNotEmpty()
  gender: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  birth: Date;

  @Column({ nullable: false, unique: true })
  @IsNotEmpty()
  @Length(11)
  document: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  phone: string;

  @Column({ nullable: false, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  password: string;

  @Column()
  admin: boolean;

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

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
    return this.password;
  }
}
