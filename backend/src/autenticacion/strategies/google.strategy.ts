import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
      super({
    clientID: process.env.GOOGLE_CLIENT_ID ?? (() => { throw new Error('GOOGLE_CLIENT_ID is missing'); })(),
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? (() => { throw new Error('GOOGLE_CLIENT_SECRET is missing'); })(),
    callbackURL: process.env.GOOGLE_CALLBACK_URL ?? (() => { throw new Error('GOOGLE_CALLBACK_URL is missing'); })(),
    scope: ['email', 'profile'],
    passReqToCallback: true,
});
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      nombre: name.givenName,
      apellido: name.familyName,
      foto: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
