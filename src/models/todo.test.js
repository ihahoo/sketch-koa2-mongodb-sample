import mongoose from "mongoose";

import Todo from "./todo";
import { plain } from "../lib";

describe("Todo model", () => {
  beforeAll(async () => {
    mongoose.Promise = Promise;
    mongoose.connect(global.__MONGO_URI__, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  it("should insert a doc into collection", async () => {
    const doc = {
      todo: "a task",
      createBy: "xxx",
      updateBy: "yyy",
    };

    const todo = await Todo.create(doc);

    expect(todo.createAt).not.toBeUndefined();
    expect(todo.updateAt).not.toBeUndefined();
    expect(todo.createBy).toBe("xxx");
    expect(todo.updateBy).toBe("yyy");

    expect(plain(todo)).toMatchObject(doc);
  });
});
