//@ts-check

import * as schemas from "./todo.schema.js";
import { validate } from "../middlewares";

/**
 * @typedef {Object} State
 */

export default class {
  /**
   * Bind service to router
   *
   * @param {import("koa-tree-router")} router the koa compatible router
   * @returns {this}
   */
  bind(router) {
    const listTodos = async ctx => {
      const res = await this.listTodos(ctx);
      ctx.body = res.body;
      ctx.set("x-total-count", res.headers["x-total-count"]);
      ctx.status = 200;
    };

    const createTodo = async ctx => {
      const req = {
        body: ctx.request.body,
      };
      const res = await this.createTodo(req, ctx);
      ctx.body = res.body;
      ctx.status = 201;
    };

    const showTodoById = async ctx => {
      const req = {
        todoId: ctx.params.todoId,
      };
      const res = await this.showTodoById(req, ctx);
      ctx.body = res.body;
      ctx.status = 200;
    };

    const updateTodo = async ctx => {
      const req = {
        todoId: ctx.params.todoId,
        body: ctx.request.body,
      };
      const res = await this.updateTodo(req, ctx);
      ctx.body = res.body;
      ctx.status = 200;
    };

    const deleteTodo = async ctx => {
      const req = {
        todoId: ctx.params.todoId,
      };
      await this.deleteTodo(req, ctx);
      ctx.status = 204;
    };

    router.get(
      "/todos",
      validate(null, schemas.listTodosResSchema),
      ...this.middlewares("listTodos"),
      listTodos
    );
    router.post(
      "/todos",
      validate(schemas.createTodoReqSchema, schemas.createTodoResSchema),
      ...this.middlewares("createTodo"),
      createTodo
    );
    router.get(
      "/todos/:todoId",
      validate(schemas.showTodoByIdReqSchema, schemas.showTodoByIdResSchema),
      ...this.middlewares("showTodoById"),
      showTodoById
    );
    router.put(
      "/todos/:todoId",
      validate(schemas.updateTodoReqSchema, schemas.updateTodoResSchema),
      ...this.middlewares("updateTodo"),
      updateTodo
    );
    router.delete(
      "/todos/:todoId",
      validate(schemas.deleteTodoReqSchema),
      ...this.middlewares("deleteTodo"),
      deleteTodo
    );

    return this;
  }

  /**
   * implement following abstract methods in the inherited class
   */

  /**
   * Ability to inject some middlewares
   *
   * @abstract
   * @param {string} operation name of operation
   * @returns {Array<import("koa").Middleware<State>>} middlewares
   */
  middlewares(operation) {
    return [];
  }

  /**
   * List all todos
   *
   * @abstract
   * @param {import("../api/todo").Context<State>} [ctx] koa context
   * @returns {Promise<import("../api/todo").ListTodosResponse>} Todos列表
   */
  listTodos(ctx) {
    throw new Error("not implemented");
  }

  /**
   * Create a todo
   *
   * @abstract
   * @param {import("../api/todo").CreateTodoRequest} req createTodo request
   * @param {import("../api/todo").Context<State>} [ctx] koa context
   * @returns {Promise<import("../api/todo").CreateTodoResponse>} The todo created
   */
  createTodo(req, ctx) {
    throw new Error("not implemented");
  }

  /**
   * Find todo by id
   *
   * @abstract
   * @param {import("../api/todo").ShowTodoByIdRequest} req showTodoById request
   * @param {import("../api/todo").Context<State>} [ctx] koa context
   * @returns {Promise<import("../api/todo").ShowTodoByIdResponse>} Expected response to a valid request
   */
  showTodoById(req, ctx) {
    throw new Error("not implemented");
  }

  /**
   * Update todo
   *
   * @abstract
   * @param {import("../api/todo").UpdateTodoRequest} req updateTodo request
   * @param {import("../api/todo").Context<State>} [ctx] koa context
   * @returns {Promise<import("../api/todo").UpdateTodoResponse>} The todo
   */
  updateTodo(req, ctx) {
    throw new Error("not implemented");
  }

  /**
   *
   *
   * @abstract
   * @param {import("../api/todo").DeleteTodoRequest} req deleteTodo request
   * @param {import("../api/todo").Context<State>} [ctx] koa context
   */
  deleteTodo(req, ctx) {
    throw new Error("not implemented");
  }
}
