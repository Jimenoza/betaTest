import { Request } from "express"
import { CustomRequest } from "../../customRequest";

export class UserDeleteRequest extends CustomRequest{
    private data: any;
    constructor(req: Request) {
        super();
        const body = req.body;
        if (!body.email) throw new Error('No email provided');
        this.data = {
            email: body.email,
        }
    }

    getBody(): any { return this.data }
}