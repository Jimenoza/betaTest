import * as express from "express"
import { Request, Response } from "express"
import { UserController } from "./controllers";
import { UserCreateRequest } from './requests';
const dotenv = require("dotenv");
dotenv.config();

// create and setup express app
const app = express();
app.use(express.json());

// register routes

// app.get('/', (req: Request, res: Response) => {
//     console.log('process.env.DB_HOST', process.env.DB_HOST);
//     res.send('Hola Mundo!')
//   })

// app.get("/users", function (req: Request, res: Response) {
//     // here we will have logic to return all users
// })

// app.get("/users/:id", function (req: Request, res: Response) {
//     // here we will have logic to return user by id
// })

// app.post("/users", function (req: Request, res: Response) {
//     // here we will have logic to save a user
// })

// app.put("/users/:id", function (req: Request, res: Response) {
//     // here we will have logic to update a user by a given user id
// })

// app.delete("/users/:id", function (req: Request, res: Response) {
//     // here we will have logic to delete a user by a given user id
// })

// start express server

import { AppDataSource } from "./data-source"

AppDataSource.initialize().then(async () => {

    app.post('/users', async (req: Request, res: Response) => {
        try {
            const request = new UserCreateRequest(req);
            await UserController.newUser(request);
            res.send({saved: true});
        }
        catch (err) {
            res.statusMessage = err;
            res.status(400).end();
        }
        // console.log(req.body);
    });

    app.get('/users', async (req: Request, res: Response) => {
        const users = await UserController.getUsers();
        res.send({saved: users});
        // console.log(req.body);
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
