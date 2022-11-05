import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '@o01047550871',
      database: 'owls',
      entities: [User],
      synchronize: false,
    }),
    UserModule,
    AuthModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
