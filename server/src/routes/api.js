import express from "express";
import Register from "../controllers/Register.controller.js";
import { createTodo } from "../controllers/todo.controller.js";
import { check } from "express-validator";
import { RegisterSchema } from "../validationSchema.js/RegisterSchema.js";
import Login from "../controllers/Login.controller.js";
import { LoginSchema } from "../validationSchema.js/LoginSchema.js";
import { GetTodos } from "../controllers/TodoListController.js";
import { MarkTodo } from "../controllers/MarkTodo.controller.js";
import { RemoveTodo } from "../controllers/RemoveTodo.controller.js";

const apiRoute=express.Router();
export const apiProtected=express.Router();
apiRoute.post('/register',RegisterSchema
,Register);
apiRoute.post('/login',LoginSchema,Login);

//protected routes
apiProtected.post("/createTodo",[check("desc","Todo desc is required").exists()],createTodo);

apiProtected.get("/todolist",GetTodos);

apiProtected.post("/marktodo",[check("todo_id","Todo id is required").exists()],MarkTodo);

apiProtected.post("/deletetodo",[check("todo_id","Todo id is required").exists()],RemoveTodo);

export default apiRoute;
