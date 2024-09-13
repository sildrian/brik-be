import { IsNotEmpty, IsString } from 'class-validator';

export class ProductsEntity {
    @IsNotEmpty()
    categoryid: number;

    @IsString()
    @IsNotEmpty()
    categoryname: string;

    @IsNotEmpty()
    sku: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    weight: number;

    @IsNotEmpty()
    width: number;

    @IsNotEmpty()
    length: number;

    @IsNotEmpty()
    height: number;

    @IsNotEmpty()
    image: string;

    @IsNotEmpty()
    price: number;
}