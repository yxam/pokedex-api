import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PokemonModule } from './pokemon/pokemon.module';
import { configValidationSchema } from 'config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    PokemonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
