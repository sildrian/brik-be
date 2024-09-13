import {
    Controller,
    Get,
    Post,
    Body,
    Res,
    UseGuards,
    Req,
    HttpStatus
  } from '@nestjs/common';
  import { Response } from 'express';
  import { UsersService } from '../service/users.service';
  import * as bcrypt from 'bcrypt';
  import { JwtService } from '@nestjs/jwt';
  import { AuthService } from '../../auth/service/auth.service';
  import {AuthDto} from "../../auth/dto/auth.dto";
  import {JwtAuthGuard} from '../../auth/jwt-auth.guard';

  // Specify a secret key from an environmental variable
    const secretKey = process.env.jwtSecret;

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService,private readonly authService: AuthService, private jwtService: JwtService) {}

    @Post()
    async createUser(
      @Body() { username, password }: AuthDto,
      @Res() res: Response
    ) {
        let checkUser = await this.authService.validateUser(username,password)
        if(checkUser !== null){
          return res.status(HttpStatus.CONFLICT).send({
            message: 'user already exist',
            data: ''
          })
        }
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        const result = await this.userService.createUser(username,hashedPassword);
        if(result){
            if (!secretKey) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                    message: 'JWT_SECRET environmental variable is not defined',
                    data : ''
                })
            }
            let payload = { sub: {id:result.id,username:result.username} };
            return res.status(HttpStatus.CREATED).send({
                // token : this.jwtService.sign(payload)
                token : this.jwtService.sign(payload,{secret:secretKey})
            })
        }else{
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message: 'something went wrong',
            data : ''
          })
        }
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getUser(
      @Req() request: Request,
      @Res() res: Response) {
        let userData = request["user"].sub
        let resultService = await this.userService.getUser(userData?.username)
        let new_resultService = {
          id: resultService?.id,
          username: resultService?.username
        }
        return res.status(HttpStatus.OK).send(new_resultService);
    }
}
