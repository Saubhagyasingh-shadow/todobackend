import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { StatusCode } from "../utils/constants.js";
import User from "../models/userModel.js";
import Todo from "../models/Todo.js";

export const RemoveTodo = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR, "TODO ID IS REQUIRED", errors.mapped()));
  }

  try {
    const result = await Todo.findOneAndDelete({
      userId: req.userId, // Assuming you're using 'userId' here
      _id: req.body.todo_id,
    });

    if (result) {
      const user = await User.findOneAndUpdate(
        {
          _id: req.userId,
        },
        {
          $pull: { todos: req.body.todo_id },
        }
      );

      return res.json(jsonGenerate(StatusCode.SUCCESS, "TODO DELETED", null));
    } else {
      return res.json(jsonGenerate(StatusCode.NOT_FOUND, "TODO NOT FOUND", null));
    }
  } catch (error) {
    return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "COULD NOT DELETE", null));
  }
};
