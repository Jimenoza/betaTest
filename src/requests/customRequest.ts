import * as jwt from "jsonwebtoken";

export class CustomRequest {
  protected userId: number;

  constructor(){
    this.userId = undefined;
  }

  getUserId(): number { return this.userId; }

  generateToken(user): string {
    return jwt.sign(user, process.env.TOKEN);
  }

  authenticateToken(req, res): void {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) throw new Error('Invalid User');

    jwt.verify(token, process.env.TOKEN as string, (err: any, user: any) => {
      if (err) throw new Error(err);
      this.userId = parseInt(user);
    });
  }
}


