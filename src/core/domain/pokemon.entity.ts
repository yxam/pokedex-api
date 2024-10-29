import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pokemons')
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  height?: number;

  @Column({ nullable: true })
  weight?: number;

  @Column({ nullable: true })
  baseExperience?: number;
}
