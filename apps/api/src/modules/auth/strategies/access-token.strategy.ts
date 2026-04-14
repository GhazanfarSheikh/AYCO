import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { ACCESS_TOKEN_COOKIE } from "../auth.constants";

type JwtPayload = {
  email: string;
  role: string;
  sub: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    const accessTokenSecret =
      process.env.JWT_ACCESS_SECRET ?? "ayco-dev-access-secret";

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: { cookies?: Record<string, string> }) =>
          request.cookies?.[ACCESS_TOKEN_COOKIE] ?? null,
      ]),
      secretOrKey: accessTokenSecret,
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
