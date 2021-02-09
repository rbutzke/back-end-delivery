import { CoreOutput } from 'src/common/dtos/output.dto';
import { ArgsType, Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from '../entities/user.entity';


@ArgsType()
export class UserProfileInput {
    @Field(type=>Int)
    userId: number;
}

@ObjectType()
export class UserProfileOutput extends CoreOutput {
    @Field(type=>User, { nullable: true }) 
    user?: User;
}