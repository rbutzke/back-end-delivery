import { CoreEntity } from './../../common/entities/core.entity';
import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { number } from 'joi';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@InputType('CategoryInputType',{isAbstract:true})
@ObjectType()
@Entity()
export class Category extends CoreEntity{
  
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;

  @Field((type) => String)
  @Column({ unique: true })
  @IsString()
  @Length(5)
  name: string;

  @Field(type => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  coverImg: string;

  @Field(type => String)
  @Column({unique:true})
  @IsString()
  slug: string;

  @Field(type=> [Restaurant])
  @OneToMany(
      type => Restaurant,
      restaurant => restaurant.category,
      )
      restaurants: Restaurant[];

}