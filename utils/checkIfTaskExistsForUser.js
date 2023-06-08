import TaskModel from "../DB/models/Task.js"

export const checkIfTaskExists = async (req, res, next) => {
    const tasks = await TaskModel.find({ user: req.body.user })
    
    if (!tasks.some(task => {return task.task === req.body.task})) {
        next();
    } else {
        return res.send("Task exists for this user");
    }
}