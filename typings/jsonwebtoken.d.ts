declare module "jsonwebtoken" {
  export interface JwtPayload {
    [key: string]: any;
  }

  export interface SignOptions {
    issuer?: string;
    subject?: string;
    audience?: string | string[];
    expiresIn?: string | number;
    notBefore?: string | number;
    algorithm?: string;
    keyid?: string;
    noTimestamp?: boolean;
    header?: object;
    encoding?: string;
  }

  export interface VerifyOptions {
    issuer?: string;
    subject?: string;
    audience?: string | string[];
    expiresIn?: string | number;
    notBefore?: string | number;
    algorithm?: string | string[];
    ignoreExpiration?: boolean;
    ignoreNotBefore?: boolean;
    clockTimestamp?: number;
    clockTolerance?: number;
    maxAge?: string | number;
    clockTimestampIsDate?: boolean;
    nonce?: string;
    jti?: string;
    jwtid?: string;
  }

  export function sign(
    payload: string | Buffer | object,
    secretOrPrivateKey: string | Buffer,
    options?: SignOptions
  ): string;

  export function verify(
    token: string,
    secretOrPublicKey: string | Buffer,
    options?: VerifyOptions
  ): JwtPayload | string;

  export function decode(
    token: string,
    options?: { complete?: boolean }
  ): null | { [key: string]: any } | string;
}
