import { Module } from '@nestjs/common';
import { UsersModule } from "../users/users.module";
import { AuthService } from "./service/auth.service"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller';
import { UsersService } from "../users/service/users.service";
// import { LocalStrategy } from './local.auth';
import { PrismaService } from '../prisma.service';
import {JwtStrategy} from "../auth/jwt.strategy";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.jwtSecret,
      signOptions: { expiresIn: '25m' }, // e.g. 30s, 7d, 24h
    }),
  ],
  providers: [AuthService,UsersService, PrismaService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
