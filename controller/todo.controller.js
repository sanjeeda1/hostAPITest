const ToDoService = require('../services/todo.service');

exports.createToDo =  async (req,res,next)=>{
    try {
        const { userId,title, desc } = req.body;
        let todoData = await ToDoService.createToDo(userId,title, desc);
        res.json({status: true,success:todoData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

/*exports.getToDoList =  async (req,res,next)=>{
    try {
        const { userId } = req.body;
        let todoData = await ToDoService.getUserToDoList(userId);
        res.json({status: true,success:todoData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}*/

exports.getToDoList = async (req, res, next) => {
    try {
        const { userId } = req.body;
        
        // Ensure userId is provided
        if (!userId) {
            return res.status(400).json({ status: false, message: "userId is required" });
        }

        // Fetch todo data from the service
        let todoData = await ToDoService.getUserToDoList(userId);

        // Send the response back to the client
        res.json({ status: true, success: todoData });
    } catch (error) {
        console.error(error, 'err---->');
        
        // Send a generic error message to the client
        res.status(500).json({ status: false, message: "Internal Server Error" });

        // Pass the error to the next middleware
        next(error);
    }
};



exports.deleteToDo =  async (req,res,next)=>{
    try {
        const { id } = req.body;
        let deletedData = await ToDoService.deleteToDo(id);
        res.json({status: true,success:deletedData});
    } catch (error) {
        console.log(error, 'err---->');
        console.error('Error in deleting ToDo:', error);
        res.status(500).send({ message: 'Failed to delete ToDo', error: error.message });
  
        next(error);
        
    }
}