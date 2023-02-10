import { Inject, Injectable } from '@nestjs/common';

//database connect use mysql2
import { DatabaseConnection } from 'src/database.providers';

// interface user
import { User } from './interfaces/user/user.interface';

@Injectable()
export class UserService {
    
    constructor(private readonly databaseConnection: DatabaseConnection){}

    // get userlist form database localhost
    getUserList() {
        return new Promise((resolve, reject) => {
            this.databaseConnection.getConnection().query('SELECT * FROM users', (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    // get user by id, in table users, database mieushopdb
    getUserById(userId: number) {
        return new Promise((resolve, reject) => {
            this.databaseConnection.getConnection().query(`SELECT * FROM users WHERE id = ${userId}`, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results[0]);
            });
        });
    }

    // create new user for table users
    createUser(user: User) {
        return new Promise((resolve, reject) => {
            this.databaseConnection.getConnection().query(`INSERT INTO users (name, numberPhone, userName, password) VALUES ('${user.name}', '${user.numberPhone}', '${user.userName}', '${user.password}')`, (error, results:any) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.insertId);
            });
        });
    }

     // create new user for table users
    updateUser(user: any) {
        return new Promise((resolve, reject) => {
            this.databaseConnection.getConnection().query(
            `UPDATE users
            SET name = '${user.name}', userName = '${user.userName}', password = '${user.password}', numberPhone = '${user.numberPhone}'
            WHERE id = '${user.id}';
            `, (error, results:any) => {
                if (error) {
                    return reject(error);
                }
                resolve(true);
            });
        });
    }

    // delete user by id
    deleteUser(userId: number) {
        return new Promise((resolve, reject) => {
            this.databaseConnection.getConnection().query(`DELETE FROM users WHERE id = ${userId};`, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(true);
            });
        });
    }
}


