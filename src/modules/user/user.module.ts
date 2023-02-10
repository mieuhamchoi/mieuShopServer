import { Module } from '@nestjs/common';


import { UserController } from './user.controller';
import { UserService } from './user.service';

//database connect use mysql2
import { DatabaseConnection } from 'src/database.providers';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    DatabaseConnection
  ]
})
export class UserModule {}
