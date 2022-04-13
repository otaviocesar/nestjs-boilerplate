import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../../domain/entities/user/user.module';
import { AuthController } from '../../interfaces/http/auth.controller';
import { LocalStrategy } from './jwt/local.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthService } from '../../app/services/auth.service';

import { SECRET_JWT } from '../environments';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: SECRET_JWT,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AuthServicePort',
      useClass: AuthService,
    },
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
