import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    // 🔎 Logs para verificar que las variables se están leyendo
    console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
    console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);
    console.log('GOOGLE_CALLBACK_URL:', process.env.GOOGLE_CALLBACK_URL);

    super({
      clientID:
        process.env.GOOGLE_CLIENT_ID ??
        (() => {
          throw new Error('GOOGLE_CLIENT_ID missing');
        })(),
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ??
        (() => {
          throw new Error('GOOGLE_CLIENT_SECRET missing');
        })(),
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ??
        (() => {
          throw new Error('GOOGLE_CALLBACK_URL missing');
        })(),
      scope: ['email', 'profile'],
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

    console.log('USUARIO CONSTRUIDO:', user);  // 👀 Log final

    done(null, user);
  }
}




