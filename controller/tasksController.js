import Task from "../models/todo.model.js";

export const createTaskController = async (req, res) => {
  try {
    const data= req.body;
    const task = new Task(data);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getAllTaskController = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tasks = await Task.find({ createdBy: userId});
    res.json(tasks);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const updateTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id,{$set: req.body}, { new: true });
    console.log(updatedTask);
    if (!updatedTask) return res.status(404).json({ message: "Task not found" });
    res.status(201).json({message : "Task successfully updated" , data: updatedTask});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export const deleteTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}