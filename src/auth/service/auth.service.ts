import { Injectable,NotAcceptableException } from '@nestjs/common';
import { UsersService } from '../../users/service/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from "../entity/auth.entity";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService, private jwtService: JwtService
    ) { }

    validateToken(token: string) {
        return this.jwtService.verify(token, {
            secret : process.env.jwtSecret
        });
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.getUser(username);
        console.log("A",user)
        console.log("B",password)
        if (!user) return null;
        const passwordValid = await bcrypt.compare(password, user.password)
        // if (!user) {
        //     throw new NotAcceptableException('could not find the user');
        // }
        if (user && passwordValid) {
            return user;
        }
        return null;
    }
    
    async login(username: string, password: string): Promise<AuthEntity> {
        let checkUser = await this.validateUser(username,password)
        if(checkUser === null){
            return null;
        }
        const payload = {sub: {id:checkUser?.id,username:checkUser?.username}}
        return {token: this.jwtService.sign(payload)}
    }
}
