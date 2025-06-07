declare module 'jsonwebtoken' {
  export function sign(
    payload: string | object | Buffer,
    secretOrPrivateKey: jwt.Secret,
    options?: SignOptions
  ): string;
  
  interface SignOptions {
    algorithm?: string;
    expiresIn?: string | number;
  }
} 