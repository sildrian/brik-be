import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// import { ControllerModule } from './controller/controller.module';
// import { DtoModule } from './dto/dto.module';
import { ProductsModule } from './products/products.module';

@Module({
  // imports: [AuthModule, UsersModule, ControllerModule, DtoModule],
  imports: [ConfigModule.forRoot(), AuthModule, UsersModule, ProductsModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
