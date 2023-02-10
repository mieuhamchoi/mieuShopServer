import { BadRequestException, Controller, Get, HttpException, Param, ParseIntPipe, Res } from '@nestjs/common';
import { Body, Delete, Post, Put, Req } from '@nestjs/common/decorators';
import { UserService } from './user.service';
// filter fileds in object
import { pick } from 'lodash';
// interface user
import { User } from './interfaces/user/user.interface';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}
    // function custom validate
    public validateUser(user: User) {
        if (typeof user.name !== 'string' || typeof user.userName !== 'string' || typeof user.numberPhone !== 'string' || typeof user.password !== 'string') {
            return false
        }
        return true
    }

    // api get userlist from table users in database has name: mieushopdb
    @Get('getUserList')
    async  getUserList(@Res() response) {
        await this.userService.getUserList().then(userList => {
            return response.status(200).json({
                statusCode: 200,
                message: "Get user list success",
                data: userList
            })
        }).catch((error) => {
            //Case error server
            throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Some error description' })
        });
    }

    // api get userlist from table users in database has name: mieushopdb
    // use Pipe 'ParseIntPipe' if prams can't pare to number return "statusCode": 400,"message": "Validation failed (numeric string is expected)",
    @Get('getUserById/:userId')
    async  getUserById(@Res() response, @Param('userId', ParseIntPipe) userId: number) {
        await this.userService.getUserById(userId).then(user => {
            //check undefine value
            if (!user) {
                return response.status(400).json({
                    statusCode: 400,
                    message: "User id do not exist"
                })
            }
            // success return object user
            return response.status(200).json({
                statusCode: 200,
                message: "Get user success",
                data: user
            })
        }).catch((error) => {
            //Case error server
            throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Some error description' })
        });
    }

    //api insert user into users table in database has name: mieushopdb
    @Post('createUser')
    async createUser(@Res() response, @Body() body) {
        // pick dream field
        let newUser = pick(body, ['name', 'numberPhone', 'userName', 'password']);
        // validate field
        if (!this.validateUser(newUser)) {
            return response.status(400).json({
                statusCode: 400,
                message: "Data type not standard"
            })
        }
        // call service create user
        await this.userService.createUser(newUser).then(insertId => {
            if(!insertId) {
                return response.status(400).json({
                    statusCode: 400,
                    message: "Create failed"
                })
            }
            return response.status(200).json({
                statusCode: 200,
                message: "Create success",
                userId: insertId
            })
        }).catch((error) => {
            //Case error server
            console.log('loi', error)
            throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Some error description' })
        });
    }

    //api update user
    @Put('updateUser')
    async  updateUser(@Res() response, @Body() body) {
         // call service update user
        await this.userService.updateUser(body).then(result => {
            if (!result) {
                return response.status(400).json({
                    statusCode: 400,
                    message: "Update failed"
                })
            }
            return response.status(200).json({
                statusCode: 200,
                message: "Update success"
            })
        }).catch((error) => {
            //Case error server
            throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Some error description' })
        });
    }

    //api delete user
    @Delete('deleteUser/:userId')
    async  deleteUser(@Res() response, @Param('userId', ParseIntPipe) userId: number) {
         // call service delete user
         await this.userService.deleteUser(userId).then(result => {
            if (!result) {
                return response.status(400).json({
                    statusCode: 400,
                    message: "Delete failed"
                })
            }
            return response.status(200).json({
                statusCode: 200,
                message: "delete success"
            })
        }).catch((error) => {
            //Case error server
            throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Some error description' })
        });
    }
}


