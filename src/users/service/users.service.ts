import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { users, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}
  async getAllUser(): Promise<users[]> {
    return this.prisma.users.findMany();
  }
  async getUser(username: string): Promise<users | null> {
    // return this.prisma.users.findUnique({ where: { username: username } });
    return await this.prisma.users.findFirst({where: {username: username}})
  }
  async createUser(username: string, password: string): Promise<users> {
    let userInput: Prisma.usersCreateInput
    userInput = {
      username: username,
      password: password,
    }
    return this.prisma.users.create({
      data: userInput
    });
  }
  async updateUser(id: number, data:users): Promise<users> {
    return this.prisma.users.update({
      where: { id: Number(id) },
      data
    });
  }
  async deleteUser(id: number): Promise<users> {
    return this.prisma.users.delete({
      where: { id: Number(id) },
    });
  }
}
