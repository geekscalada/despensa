export interface TokenPayload {
  id: number;
  email: string;
  nick: string;
  iat?: number;
  exp?: number;
}
