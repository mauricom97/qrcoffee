import { IsString, IsNumber, IsOptional, IsEnum, IsArray, Min, MaxLength, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductStatus, ProductType } from '../entities/product.entity';


export class CreateProductDto {
    @ApiProperty({ description: 'SKU único do produto', maxLength: 50 })
    @IsString()
    @MaxLength(50)
    sku: string;
}
