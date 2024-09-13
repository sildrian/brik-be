import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { products, Prisma } from '@prisma/client';
// import { ProductsEntity } from "../entity/products.entity";
// import { PaginatedResult, PaginateFunction, paginator } from '@providers/prisma/paginator';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) {}
    async createProduct(categoryid: number,
        categoryname: string,
        sku: string,
        name: string,
        description: string,
        weight: number,
        width: number,
        length: number,
        height: number,
        image: string,
        price: number): Promise<products> {
        let productInput: Prisma.productsCreateInput
        productInput = {
            categoryid: categoryid,
            categoryname: categoryname,
            sku: sku,
            name: name,
            description: description,
            weight: weight,
            length: length,
            height: height,
            image: image,
            price: price            
        }
        return this.prisma.products.create({
          data: productInput
        });
    }

    async getAllProducts(search: string, page: number, limit: number): Promise<products[]> {
        let offset_ = (page-1) * limit
        if(search != ""){
            // return await this.prisma.products.findMany({where: {name: search}});
            return await this.prisma.$queryRaw(
                Prisma.sql`SELECT * from products WHERE name like '%${search}%' limit 10 offset ${offset_}`
            )
        }else{
            // return await this.prisma.products.findMany();
            return await this.prisma.$queryRaw(
                Prisma.sql`SELECT * from products limit 10 offset ${offset_}`
            )
        }
    }

    async getMeta(): Promise<any>{
        let rs = await this.prisma.$queryRaw(
            Prisma.sql`SELECT count(*) as total from products`
        )
        let reresult = {
            total : parseInt(rs[0].total)
        }
        return reresult
    }

    async getProduct(id: number): Promise<products | null> {
        return await this.prisma.products.findFirst({where: {id: Number(id)}})
      }
}
