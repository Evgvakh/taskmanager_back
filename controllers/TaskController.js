import TaskModel from '../DB/models/Task.js'
import { validationResult } from "express-validator";

export const createTask = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
        const taskDocument = new TaskModel({
            title: req.body.title,
            task: req.body.task,
            user: req.body.user,
            status: "assigned",
            due: req.body.due,
        });

        const task = await taskDocument.save();

        res.json(task);
    } catch (err) {
        res.send({
            error: err,
            message: "Task add failed",
        });
    }
};

export const removeTask = async (req, res) => {
    try {
        const result = await TaskModel.deleteOne({_id:req.params.id})
        if (result) {
            res.send(result);
        } else {
            res.send({message: 'Could not delete task'})
        }
    } catch (err) {
        res.json(err);
    }
}

export const setStarted = async (req, res) => {
    try {
        console.log(req.params.id);
        const task = await TaskModel.findByIdAndUpdate(
            req.params.id,
            { status: "started" },
            { returnDocument: 'after' }
        );
        res.send(task)
    } catch (err) {
        res.json(err)
    }
}

export const setPending = async (req, res) => {
    try {
        console.log(req.params.id);
        const task = await TaskModel.findByIdAndUpdate(
            req.params.id,
            { status: "pending" },
            { returnDocument: 'after' }
        );
        res.send(task)
    } catch (err) {
        res.json(err)
    }
}

export const setFinished = async (req, res) => {
    try {
        console.log(req.params.id);
        const task = await TaskModel.findByIdAndUpdate(
            req.params.id,
            { status: "finished" },
            { returnDocument: "after" }
        );
        res.send(task);
    } catch (err) {
        res.json(err);
    }
};

export const getTaskByUserName = async (req, res) => {
    try {
        console.log(req.params.user);
        const task = await TaskModel.find({user: req.params.user}).exec();
        res.send(task);
    } catch (err) {
        res.json(err);
    }
}
