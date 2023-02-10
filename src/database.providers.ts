import { createConnection, Connection } from 'mysql2';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseConnection {
  private connection: Connection;

  constructor() {
    this.connection = createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'mieushopdb'
    });
  }

  getConnection(): Connection {
      return this.connection;
  }
}
