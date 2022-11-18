import jwt from 'jsonwebtoken';
import { IJwt, IToken } from '../interfaces/IJwt';
import 'dotenv/config';
import { UnauthorizedError } from '../errors';

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

  validateToken (token: string): IToken | null {
    try {
      const { jwtSecret } = this;
      const result = jwt.verify(token, jwtSecret);

      return result as IToken;
    } catch (error) {
      throw new UnauthorizedError();
    }
  }
}

// const teste = (): void => {
//   const token = new JWT().generateToken({ username: 'rod', accountId: 3 });
//   console.log(token);
//   const decoded = new JWT().validateToken(token);
//   console.log(decoded);
// };

// teste();

export default JWT;
