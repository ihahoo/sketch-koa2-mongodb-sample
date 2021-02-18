//@ts-check

import { todoService } from "../services";

export default function() {
  return todoService.createTodo({
    body: { todo: "a todo", status: "open" },
  });
}
