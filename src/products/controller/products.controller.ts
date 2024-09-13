import { Controller,
    Get,
    Post,
    Body,
    Res,
    UseGuards,
    Param,
    Query,
    HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from "../service/products.service";
import { ProductsEntity } from "../entity/products.entity";
import { ProductsRequest } from "../request/products.request";
import {JwtAuthGuard} from '../../auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async createProducts(
      @Body() { categoryid,
        categoryname,
        sku,
        name,
        description,
        weight,
        width,
        length,
        height,
        image,
        price }: ProductsEntity,
      @Res() res: Response
    ) {
        const result = await this.productsService.createProduct(categoryid,
        categoryname,
        sku,
        name,
        description,
        weight,
        width,
        length,
        height,
        image,
        price );
        if(result){
            return res.status(HttpStatus.OK).send({
                message: 'Product berhasil dibuat',
                data : ''
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
    async getProducts(
        // @Param('search') search: string,
        @Query() query: ProductsRequest,
        @Res() res: Response) {
        let resultService = await this.productsService.getAllProducts(query.search,query.page,query.limit)
        let resultMeta = await this.productsService.getMeta()
        return res.status(HttpStatus.OK).send({
            message: 'list products',
            data : resultService,
            meta : resultMeta
          });
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getProductById(
        @Param('id') id: number,
        // params: ProductsEntity),
        @Res() res: Response) {
      let resultService = await this.productsService.getProduct(id)
      return res.status(HttpStatus.OK).send({
        message: 'product detail',
        data : resultService
      });
    }
}
