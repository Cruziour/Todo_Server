import { Task } from '../models/task.models.js' 

const handleTaskAdd = async (req, res) => {
    const { task } = req.body
    // Validate input
        if (!task) {
            return res.status(400).json({ message: 'Task is required and must be a non-empty string.' });
        }
    
        try {
            // Create and save the task
            const saveTask = new Task({task: task})
            const storedTask = await saveTask.save()
    
            res.status(201).json({
                message: 'Task created successfully',
                data: storedTask
            });
        } catch (error) {
            console.error('Error creating task:', error); // Log detailed error server-side
            res.status(500).json({
                message: 'Error adding task. Please try again later.',
            });
        }
}

const handleShowAllTask = async (req, res) => {
    try {
        const tasks = await Task.find();
            
            // Check if the tasks array is empty
            if (tasks.length === 0) {
                return res.status(404).json({ message: 'No tasks found.' });
            }
            
            res.status(200).json({ data: tasks });
        } catch (error) {
            console.error(`Error reading tasks: ${error.message}`);
            res.status(500).json({ message: 'Error reading tasks. Please try again later.' });
    }
}

const handleDeleteTask = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedTask = await Task.findByIdAndDelete(id)
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found.' });
        }
        res.status(200).json({ message: 'Task deleted successfully' })
    } catch (error) {
        console.error(`Error deleting task: ${error.message}`);
        res.status(500).json({ message: 'Error deleting task, Please try again later.' })
    }
}

const handleUpdateTask = async (req, res) => {
    const id = req.params.id;
    const { task } = req.body;

    // Validate input
    if (!task) {
        return res.status(400).json({ message: 'Task is required and must be a non-empty string.' });
    }

    try {
        const updatedTask = await Task.findByIdAndUpdate(id, { task: task });
        
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        res.status(200).json({
            message: 'Task updated successfully',
            data: updatedTask
        });
        
    } catch (error) {
        console.error(`Error updating task: ${error.message}`);
        res.status(500).json({ message: 'Error updating task, Please try again later.' });
    }
}

const handleTaskShowById = async (req, res) => {
    const id = req.params.id
    try {
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        res.setHeader('X-Name', 'Rupesh').status(200).json({
            message: 'Task found',
            data: task
        })
    } catch (error) {
        console.error(`Error fetching task: ${error.message}`);
        res.status(500).json({ message: 'Error fetching task, Please try again later.'});
    }
}

export {
    handleTaskAdd,
    handleShowAllTask,
    handleDeleteTask,
    handleUpdateTask,
    handleTaskShowById
}