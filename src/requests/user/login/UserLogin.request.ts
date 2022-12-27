import { Request } from "express"
import { CustomRequest } from "../../customRequest";

export class UserLoginRequest extends CustomRequest{
    private data: any;
    constructor(req: Request) {
        super();
        const body = req.body;
        if (!body.email) throw new Error('No email provided');
        if (!body.password) throw new Error('No password provided');
        this.data = {
            email: body.email,
            password: body.password,
        }
    }

    getBody(): any { return this.data }
}