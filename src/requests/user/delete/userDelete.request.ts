import { Request } from "express"

export class UserDeleteRequest {
    private data: any;
    constructor(req: Request) {
        const body = req.body;
        if (!body.email) throw new Error('No email provided');
        this.data = {
            email: body.email,
        }
    }

    getBody(): any { return this.data }
}