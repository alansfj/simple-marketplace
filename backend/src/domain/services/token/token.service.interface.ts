export interface TokenServiceInterface {
  generateToken(payload: any, duration: string | number): Promise<string>;
  validateToken<T>(token: string): Promise<T>;
}
