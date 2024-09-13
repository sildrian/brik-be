import { Module } from '@nestjs/common';
import { ProductsController } from './controller/products.controller';
import { ProductsService } from './service/products.service';
import { PrismaService } from '../prisma.service';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService,PrismaService,JwtAuthGuard,JwtService],
  exports: [ProductsService],
})
export class ProductsModule {}
