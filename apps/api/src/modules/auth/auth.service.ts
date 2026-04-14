import { randomUUID } from "node:crypto";

import {
  loginSchema,
  refreshSessionSchema,
  registerSchema,
} from "@ayco/contracts";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";

import { authErrors } from "./auth.errors";
import { AuthRepository } from "./auth.repository";

type SessionUser = {
  email: string;
  firstName: string;
  id: string;
  role: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(input: unknown) {
    const parsed = registerSchema.parse(input);
    const existing = await this.authRepository.findUserByEmail(parsed.email);

    if (existing) {
      throw authErrors.userAlreadyExists();
    }

    const passwordHash = await argon2.hash(parsed.password);
    const user = await this.authRepository.createUser({
      email: parsed.email,
      firstName: parsed.firstName,
      passwordHash,
    });

    return this.issueSession(user);
  }

  async login(input: unknown) {
    const parsed = loginSchema.parse(input);
    const user = await this.authRepository.findUserByEmail(parsed.email);

    if (!user) {
      throw authErrors.invalidCredentials();
    }

    const passwordMatches = await argon2.verify(
      user.passwordHash,
      parsed.password,
    );

    if (!passwordMatches) {
      throw authErrors.invalidCredentials();
    }

    return this.issueSession(user);
  }

  async refresh(input: unknown) {
    const parsed = refreshSessionSchema.parse(input);
    const payload = this.jwtService.verify<{ sid: string; sub: string }>(
      parsed.refreshToken,
      { secret: process.env.JWT_REFRESH_SECRET },
    );
    const session = await this.authRepository.findRefreshToken(payload.sid);

    if (!session || session.revokedAt) {
      throw authErrors.refreshTokenInvalid();
    }

    const matches = await argon2.verify(session.tokenHash, parsed.refreshToken);

    if (!matches) {
      throw authErrors.refreshTokenInvalid();
    }

    await this.authRepository.revokeRefreshToken(session.id);
    const user = await this.authRepository.findUserById(payload.sub);

    if (!user) {
      throw authErrors.refreshTokenInvalid();
    }

    return this.issueSession(user);
  }

  private async issueSession(user: SessionUser) {
    const sessionId = randomUUID();
    const accessToken = await this.jwtService.signAsync(
      {
        email: user.email,
        role: user.role,
        sub: user.id,
      },
      {
        expiresIn: "15m",
        secret: process.env.JWT_ACCESS_SECRET,
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      {
        sid: sessionId,
        sub: user.id,
      },
      {
        expiresIn: "7d",
        secret: process.env.JWT_REFRESH_SECRET,
      },
    );

    await this.authRepository.createRefreshToken({
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      tokenHash: await argon2.hash(refreshToken),
      userId: user.id,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        email: user.email,
        firstName: user.firstName,
        id: user.id,
        role: user.role,
      },
    };
  }
}
