import { Request } from "express"

export class UserCreateRequest {
    private data: any;
    constructor(req: Request) {
        const body = req.body;
        if (!body.firstName) throw new Error('No first name provided');
        if (!body.lastName) throw new Error('No Last Name provided');
        if (!body.email) throw new Error('No email provided');
        if (!body.password) throw new Error('No password provided');
        this.data = {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password,
        }
    }

    getBody(): any { return this.data }
}