import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { PrismaService } from '../prisma.service';
import {AuthService} from "../auth/service/auth.service";
import { JwtModule } from '@nestjs/jwt';
// import { JwtStrategy } from '../auth/jwt.strategy';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [
    JwtModule.register({
      secret: process.env.jwtSecret,
      // secret: jwtSecret,
      signOptions: { expiresIn: '5m' }, // e.g. 30s, 7d, 24h
    })
  ],
  // providers: [UsersService, AuthService, PrismaService,JwtService,JwtStrategy],
  providers: [UsersService, AuthService, PrismaService, JwtService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
