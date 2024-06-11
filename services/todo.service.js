const { deleteToDo } = require("../controller/todo.controller");
const ToDoModel = require("../models/todo.model");


class ToDoService{
    static async createToDo(userId,title,description){
            const createToDo = new ToDoModel({userId,title,description});
            return await createToDo.save();
    }

   /* static async getUserToDoList(userId){
        const todoList = await ToDoModel.find({userId})
        return todoList;
   }*/


   static async getUserToDoList(userId) {
     try {
         // Check if userId is provided
         if (!userId) {
             throw new Error('User ID is required');
         }

         // Fetch the todo list from the database
         const todoList = await ToDoModel.find({ userId });

         // Return the fetched todo list
         return todoList;
     } catch (error) {
         console.error('Error fetching todo list:', error);
         throw error;
     }
 }


   static async deleteToDo(id){
        const deleted = await ToDoModel.findByIdAndDelete({_id:id})
        return deleted;
   }
}

module.exports = ToDoService;