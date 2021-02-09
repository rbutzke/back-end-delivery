import { Verification } from './entities/verification.entity';
import { UserService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([User, Verification])],
    providers: [UsersResolver, UserService],
    exports: [UserService]
})
export class UserModule {}
