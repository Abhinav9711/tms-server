const { isEmpty, get } = require('lodash');

const User = require('../models/user');

const createUser = async (req, res) => {
    try {
        const email = get(req.body, 'email');
        const name = get(req.body, 'name');
        const number = get(req.body, 'number');
        const password = get(req.body, 'password');
        const confirmPassword = get(req.body, 'confirmPassword');
        const taskDetails = [{ status: 'todo', items: [] }, { status: 'in progress', items: [] }, { status: 'completed', items: [] }];

        if (isEmpty(email) || isEmpty(name) || isEmpty(password) || isEmpty(confirmPassword) || isEmpty(number)) {
            res.json({ message: 'Please pass all the required values', status: 'failed' });
            return;
        }

        if (password !== confirmPassword) {
            res.json({ messsage: 'Password are not matching, Please insert correct password', status: 'failed' });
            return;
        }

        const userDetails = new User({
            email,
            name,
            number,
            password,
            taskDetails
        })
        await userDetails.save();

        res.status(200).json({ message: `User : ${name}, registered successfully`, status: 'success', data: { name, email } });
    }
    catch (error) {
        res.json({ 'message': error.message, status: 'failed' });
    }
}

const signInUser = async (req, res) => {

    try {
        const email = get(req.body, 'email');
        const password = get(req.body, 'password');

        let userData = await User.findOne({ email });
        if (isEmpty(userData)) {
            res.json({ message: 'User does not exist, Please sign up', status: 'failed' });
            return;
        }

        if (password !== get(userData, 'password')) {
            res.json({ message: 'Invalid Password', status: 'failed' });
            return;
        }

        res.json({ data: userData, message: 'User sigin successfull', status: 'success' });
    }

    catch (error) {
        res.status(400).json(error);
    }
}

const createTask = async (req, res) => {
    const email = get(req.body, 'email');
    const title = get(req.body, 'title');
    const description = get(req.body, 'description');
    const status = get(req.body, 'status');
    const userData = await User.findOne({ email });
    let taskDetails = get(userData, 'taskDetails');

    taskDetails.map(task => {
        if (task.status == status) {
            let { items = [] } = task;
            items.push({ title, description });
            task.items = items;
        }
    })

    await User.updateOne({ email },
        {
            "$set": {
                taskDetails: taskDetails ? taskDetails : taskDetails.push({ status, items: { title, description } })
            }
        });

    res.json({ message: "Task created", status: "success", data: taskDetails });
}

const updateTask = async (req, res) => {
    const email = get(req.body, 'email');
    const list = get(req.body, 'list')
    if (!isEmpty(list)) {
        await User.updateOne({ email },
            {
                "$set": {
                    taskDetails: list
                }
            });
    }
    res.json({ message: "Task created", status: "success" });
}

const getTaskDetails = async (req, res) => {
    const { email = '' } = req.body;
    const userDetails = await User.findOne({ email });
    res.json({ data: userDetails.taskDetails, status: 'success' });
}

const checkConnection = async (req, res) => {
    try {
        res.send('connected successful');
    }
    catch (error) {
        res.error('error:', error);
    }
}

const calculation = (data) => {
    const result = []
    let todo = [], completed = [], inProgress = []
    data.map(d => {
        if (d['status'] === 'todo') {
            todo.push({ title: d['title'], description: d['description'] })
        }
        if (d['status'] === 'in progress') {
            inProgress.push({ title: d['title'], description: d['description'] })
        }
        if (d['status'] === 'completed') {
            completed.push({ title: d['title'], description: d['description'] })
        }

    })

    result.push({ status: 'todo', items: todo }, { status: 'in progress', items: inProgress }, { status: 'completed', items: completed })
    return result;
}
module.exports = {
    createUser,
    signInUser,
    createTask,
    updateTask,
    getTaskDetails,
    checkConnection
}

