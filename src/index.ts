import * as express from "express"
import { Request, Response } from "express"
import { UserController } from "./controllers";
import { UserCreateRequest, UserUpdateRequest, UserDeleteRequest } from './requests';
import { AppDataSource } from "./data-source"
import { User } from "./entities/User";
const dotenv = require("dotenv");
dotenv.config();

// create and setup express app
const app = express();
app.use(express.json());

AppDataSource.initialize().then(async () => {

    app.post('/users', async (req: Request, res: Response) => {
        try {
            const request = new UserCreateRequest(req);
            const response = await UserController.create(request);
            res.send({res: response});
        }
        catch (err) {
            res.statusMessage = err;
            res.status(400).end();
        }
    });

    app.get('/users', async (req: Request, res: Response) => {
        const users = await UserController.getUsers();
        res.send({saved: users});
    });

    app.put('/users',async (req: Request, res: Response) => {
        try {
            const request = new UserUpdateRequest(req);
            const response = await UserController.update(request);
            res.send({res: response});
        }
        catch (err) {
            res.statusMessage = err;
            res.status(400).end();
        }
    })

    app.delete('/users', async (req: Request, res: Response) => {
        try {
            const request = new UserDeleteRequest(req);
            const response = await UserController.delete(request);
            res.send({res: response});
        }
        catch (err) {
            res.statusMessage = err;
            res.status(400).end();
        }
    });

    app.listen(3000, () => console.log('App listening'));

    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.firstName = "Timber"
    // user.lastName = "Saw"
    // user.email = 'a@mail.com'
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

    // console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
