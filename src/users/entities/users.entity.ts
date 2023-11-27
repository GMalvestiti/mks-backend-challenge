import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false, unique: true })
  email: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
