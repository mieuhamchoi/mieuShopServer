import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//database connect use mysql2
import { DatabaseConnection } from './database.providers';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, DatabaseConnection],
})
export class AppModule {}
