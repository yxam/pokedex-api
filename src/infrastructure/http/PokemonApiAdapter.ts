import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PokemonApiAdapter {
  private apiUrl: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('POKEMON_API_URL');
  }

  async fetchData(name: string): Promise<any> {
    const response: AxiosResponse = await lastValueFrom(
      this.httpService.get(`${this.apiUrl}/pokemon/${name}`),
    );
    return response.data;
  }
}
