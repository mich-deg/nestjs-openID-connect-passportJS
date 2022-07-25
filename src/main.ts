import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as session from 'express-session';
import * as passport from 'passport';
// import MongoStore from 'connect-mongo';
// const MongoStore = require('connect-mongo');
// session;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Authentication & Session
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      cookie: {
        maxAge: 30 * 60 * 1000,
        httpOnly: true,
      },
      resave: false,
      saveUninitialized: false,
      rolling: true,
      // store: new MongoStore({
      //   mongoUrl: process.env.MONGODB_URL,
      // }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
