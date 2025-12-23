// src/products/entities/product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DISCONTINUED = 'discontinued'
}

export enum ProductType {
  PHYSICAL = 'physical',
  DIGITAL = 'digital',
  SERVICE = 'service'
}

@Entity('products')
export class Product {
  @ApiProperty({ description: 'ID único do produto' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'SKU único do produto' })
  @Column({ unique: true })
  sku: string;

  @ApiProperty({ description: 'Nome do produto' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Descrição detalhada', required: false })
  @Column('text', { nullable: true })
  description: string;

  @ApiProperty({ description: 'Preço de venda' })
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ApiProperty({ description: 'Custo do produto', required: false })
  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  cost: number;

  @ApiProperty({ description: 'Status do produto', enum: ProductStatus })
  @Column({ 
    type: 'enum', 
    enum: ProductStatus, 
    default: ProductStatus.ACTIVE 
  })
  status: ProductStatus;

  @ApiProperty({ description: 'Tipo do produto', enum: ProductType })
  @Column({ 
    type: 'enum', 
    enum: ProductType, 
    default: ProductType.PHYSICAL 
  })
  type: ProductType;

  @ApiProperty({ description: 'Quantidade em estoque' })
  @Column({ default: 0 })
  quantity: number;

  @ApiProperty({ description: 'Estoque mínimo' })
  @Column({ default: 0 })
  minStock: number;

  @ApiProperty({ description: 'Estoque máximo', nullable: true })
  @Column({ nullable: true })
  maxStock: number;

  @ApiProperty({ description: 'Categoria do produto' })
  @Column({ nullable: true })
  category: string;

  @ApiProperty({ description: 'Marca do produto', required: false })
  @Column({ nullable: true })
  brand: string;

  @ApiProperty({ description: 'Peso em gramas', required: false })
  @Column({ nullable: true })
  weight: number;

  @ApiProperty({ description: 'Dimensões (LxAxC)', required: false })
  @Column({ nullable: true })
  dimensions: string;

  @ApiProperty({ description: 'URL da imagem', required: false })
  @Column({ nullable: true })
  imageUrl: string;

  @ApiProperty({ description: 'Tags para busca', isArray: true })
  @Column('simple-array', { nullable: true })
  tags: string[];

  @ApiProperty({ description: 'Data de criação' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização' })
  @UpdateDateColumn()
  updatedAt: Date;
}