import bcrypt from 'bcrypt';
import 'dotenv/config';

class Bcrypt {
  private readonly saltRounds: number = Number(process.env.SALT_ROUNDS);

  public async generatePassword (password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  };

  public async comparePassword (password: string, encrypted: string): Promise<boolean> {
    const isPassword = await bcrypt.compare(password, encrypted);
    return isPassword;
  };
}

export { Bcrypt };
