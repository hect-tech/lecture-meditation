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
import { DatabaseController } from './database/database.controller';
import { BahaiDateModule } from './bahai-date/bahai-date.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: [
        `.env.${process.env.NODE_ENV || 'development'}`,
        '.env'
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService) => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? {
          rejectUnauthorized: false,
        } : false,
        autoLoadEntities: true,
        synchronize: process.env.NODE_ENV === 'development',
        migrations: ['dist/migrations/*.js'],
        migrationsRun: process.env.NODE_ENV === 'production',
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
    BahaiDateModule,
  ],
  controllers: [AppController, DatabaseController],
  providers: [AppService],
})
export class AppModule {}
