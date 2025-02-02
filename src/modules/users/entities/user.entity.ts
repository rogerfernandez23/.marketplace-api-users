import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { Address } from '../../address/entities/address.entity';

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

  @Column({ nullable: false, default: () => "'1970-01-01 00:00:00'" })
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

  @OneToMany(() => Address, (address) => address.id)
  @JoinColumn({ name: 'address_id' })
  addresses: Address[];

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
    return this.password;
  }

  // Optional constructor to initialize the Users entity with partial data

  constructor(user?: Partial<Users>) {
    this.id = user?.id;
    this.firstName = user?.firstName;
    this.lastName = user?.lastName;
    this.gender = user?.gender;
    this.birth = user?.birth;
    this.document = user?.document;
    this.phone = user?.phone;
    this.email = user?.email;
    this.password = user?.password;
    this.admin = user?.admin;
    this.createdAt = user?.createdAt;
    this.updatedAt = user?.updatedAt;
    this.addresses = user?.addresses;
  }
}
