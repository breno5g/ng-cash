import jwt, { Jwt } from 'jsonwebtoken';
import { IJwt } from '../interfaces/IJwt';
import 'dotenv/config';

class JWT {
  jwtConfig: any;
  jwtSecret: any;
  constructor () {
    this.jwtConfig = {
      expiresIn: '1d',
      algorithm: 'HS256'
    };
    this.jwtSecret = process.env.JWT_SECRET;
  }

  generateToken (user: IJwt): string {
    const { jwtSecret, jwtConfig } = this;
    const token = jwt.sign({ data: user }, jwtSecret, jwtConfig);
    return token;
  }

  validateToken (token: string): Jwt | null {
    const { jwtSecret } = this;
    const result = jwt.decode(token, jwtSecret);
    return result;
  }
}

export default JWT;
