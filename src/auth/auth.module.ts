import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { buildOpenIdConnect, OidcStrategy } from './oidc.strategy';
import { SessionSerializer } from './session.serializer';

const OidcStrategyFactory = {
  provide: 'OidcStrategy',
  useFactory: async (authService: AuthService) => {
    const client = await buildOpenIdConnect();
    const strategy = new OidcStrategy(authService, client);
    return strategy;
  },
  inject: [AuthService],
};

@Module({
  controllers: [AuthController],
  providers: [AuthService, SessionSerializer, OidcStrategyFactory],
  imports: [
    PassportModule.register({ session: true, defaultStrategy: 'oidc' }),
  ],
})
export class AuthModule {}
