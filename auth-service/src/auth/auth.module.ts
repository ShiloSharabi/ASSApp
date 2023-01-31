import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './jwt/jwt-strategy';
import { IsAdmin } from './gurard/isAdmin.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JWTStrategy,
    IsAdmin,
  ],
  exports: [
    JWTStrategy,
    AuthService,
    PassportModule,
    IsAdmin,
  ]
})
export class AuthModule {}
