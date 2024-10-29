import { Pokemon } from '../../../core/domain/pokemon.entity';

export class IPokemon implements Pokemon {
  public readonly id: number;
  public readonly name: string;
  public readonly height?: number;
  public readonly weight?: number;
  public readonly baseExperience?: number;
  constructor({ id, name, height, weight, baseExperience }) {
    this.id = id;
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.baseExperience = baseExperience;
  }
}
