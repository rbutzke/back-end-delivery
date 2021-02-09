import { CoreEntity } from './../../common/entities/core.entity';
import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { number } from 'joi';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';
import { User } from 'src/users/entities/user.entity';

@InputType('RestaurantInputType',{isAbstract:true})
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity{
  
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;

  @Field((type) => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field((type) => String)
  @Column()
  @IsString()
  coverImg: string;

  @Field((type) => String)
  @Column()
  address: string;
  
  @Field(type => Category, { nullable: true})
  @ManyToOne(
    type => Category, 
    category => category.restaurants,
    { nullable: true, onDelete: 'SET NULL'},
  )
  category: Category;

  @Field(type => User)
  @ManyToOne(
    type => User, 
    user => user.restaurants,
    { nullable: true, onDelete: 'SET NULL'},
  )
  owner: User;
}
