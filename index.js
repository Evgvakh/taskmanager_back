import express from "express";
import cors from "cors";
import { connectToDB } from "./DB/DB.js";
import { reqisterValidator } from "./validations/auth.js";
import { taskValidator } from "./validations/task.js";
import { checkIfTaskExists } from "./utils/checkIfTaskExistsForUser.js";
import { checkAdminRights } from "./utils/checkAdminRights.js";

import chekAuth from "./utils/chekAuth.js";
import * as UserController from './controllers/UserController.js';
import * as Tasks from "./controllers/TaskController.js";

const app = express();
const PORT = 4444;
app.use(express.json());
app.use(cors());

connectToDB();

app.get("/", (req, res) => {
    res.send("WORKS");
});

app.post("/auth/register", reqisterValidator, UserController.register);
app.post("/auth/login", UserController.login);
app.get("/auth/me", chekAuth, UserController.getMyInfos);

app.post("/task/create", taskValidator, checkAdminRights, checkIfTaskExists, Tasks.createTask);
app.patch("/task/setpending/:id", Tasks.setPending);
app.patch("/task/setstarted/:id", Tasks.setStarted);
app.patch("/task/setfinished/:id", checkAdminRights, Tasks.setFinished);

app.get("/users", UserController.getAllUsers);
app.get("/tasks/:user", Tasks.getTaskByUserName);

app.delete("/task/remove/:id", checkAdminRights, Tasks.removeTask);
app.delete("/users/remove/:user", checkAdminRights, UserController.deleteUserAndTasks);

app.listen(process.env.PORT || PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server works on port ", PORT);
    }
});
