import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err) {
        throw new InternalServerErrorException(err);
      }
      req.user = user;
      next();
    })(req, res, next);
  }
}
