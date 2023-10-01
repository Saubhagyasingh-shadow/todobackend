import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { StatusCode } from "../utils/constants.js";
import Todo from "../models/Todo.js";
import { json } from "express";

export const MarkTodo = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR, "Validation failed", errors.array()));
  }

  try {
    const todo = await Todo.findOneAndUpdate(
      {
        _id: req.body.todo_id,
        // userId: req.userId, // Uncomment and add userId if needed
      },
      {
        $set: { isCompleted: true } // Assuming you want to set isCompleted to true
      },
      { new: true } // This option returns the updated document
    );

    if (todo) {
      return res.json(jsonGenerate(StatusCode.SUCCESS, "Updated successfully", todo));
    } else {
      return res.json(jsonGenerate(StatusCode.NOT_FOUND, "Todo not found", null));
    }
  } catch (error) {
    return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Could not update", null));
  }
};
