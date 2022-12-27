import * as jwt from "jsonwebtoken";

export class CustomRequest {

  generateToken(user): string {
    return jwt.sign(user, process.env.TOKEN);
  }

  authenticateToken(req, res): void {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) throw new Error('Invalid User');

    jwt.verify(token, process.env.TOKEN as string, (err: any, user: any) => {
      console.log(err)
      if (err) throw new Error(err);
      req.user = user
    })
  }
}


