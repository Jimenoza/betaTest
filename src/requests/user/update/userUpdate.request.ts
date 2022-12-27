import { Request } from "express"

export class UserUpdateRequest {
    private data: any;
    constructor(req: Request) {
        const body = req.body;
        if (!body.email) throw new Error('No email provided');
        this.data = {
            newFirstName: body.newFirstName ? body.newFirstName : '',
            newLastName: body.newLastName ? body.newLastName : '',
            newEmail: body.newEmail ? body.newEmail : '',
            newPassword: body.newPassword ? body.newPassword : '',
            email: body.email,
        }
    }

    getBody(): any { return this.data }
}