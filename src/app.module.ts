import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevotionModule } from './devotion/devotion.module';
import { BookModule } from './book/book.module';
import { AuthorsModule } from './authors/authors.module';
import { CalendarModule } from './calendar/calendar.module';
import { AudioModule } from './audio/audio.module';
import { TextModule } from './text/text.module';
import { LanguageModule } from './language/language.module';
import { SearchModule } from './search/search.module';
import { AdminModule } from './admin/admin.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        autoLoadEntities: true,
        synchronize: process.env.NODE_ENV === 'development',
      }),
      inject: [ConfigService],
    }),
    DevotionModule,
    BookModule,
    AuthorsModule,
    CalendarModule,
    AudioModule,
    TextModule,
    LanguageModule,
    SearchModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
