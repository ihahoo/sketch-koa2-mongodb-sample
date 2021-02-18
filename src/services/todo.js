// @ts-check

import Debug from "debug";
import { toMongooseQuery } from "@36node/query-normalizr";

import API from "../api/todo";
import { Todo } from "../models";
import { plain } from "../lib";
import { loadTodo, createDataRole, withRole } from "../middlewares";
import { Role } from "../constants";

const debug = Debug("store:service:todo");

/**
 * @typedef {Object} State
 * @property {import("../models/todo").TodoDocument} todo - todo model
 */

export class Service extends API {
  _middlewares = {
    showTodoById: [loadTodo],
    updateTodo: [loadTodo, createDataRole, withRole(Role.TODO_OWNER)],
    deleteTodo: [loadTodo, createDataRole, withRole(Role.TODO_OWNER)],
  };

  /**
   * Ability to inject some middlewares
   *
   * @override
   * @param {string} operation name of operation
   * @returns {Array<import("koa").Middleware<State>>} middlewares
   */
  middlewares(operation) {
    return this._middlewares[operation] || [];
  }

  /**
   * List all todos
   *
   * @override
   * @param {API.ListTodosRequest} req listTodos request
   * @returns {Promise<API.ListTodosResponse>} A paged array of todos
   */
  async listTodos(req) {
    const query = toMongooseQuery(req.query);
    query.sort = "-createAt";
    const docs = await Todo.list(query);
    const count = await Todo.count(query.filter);

    return {
      body: plain(docs),
      headers: {
        "x-total-count": count,
      },
    };
  }

  /**
   * Create a todo
   *
   * @override
   * @param {API.CreateTodoRequest} req createTodo request
   * @param {API.Context<State>} [ctx] koa context
   * @returns {Promise<API.CreateTodoResponse>} The todo created
   */
  async createTodo(req, ctx) {
    debug("crete todo with body %o", req.body);
    if (req.body.status === undefined) req.body.status = "open";
    req.body.owner = ctx.state.jwt.user;
    const todo = await Todo.create(req.body);
    return { body: plain(todo) };
  }

  /**
   * Find todo by id
   *
   * @override
   * @param {API.ShowTodoByIdRequest} req showTodoById request
   * @param {API.Context<State>} [ctx] koa context
   * @returns {Promise<API.ShowTodoByIdResponse>} Expected response to a valid request
   */
  async showTodoById(req, ctx) {
    const { todo } = ctx.state;
    return { body: plain(todo) };
  }

  /**
   * Update todo
   *
   * @override
   * @param {API.UpdateTodoRequest} req updateTodo request
   * @param {API.Context<State>} ctx koa context
   * @returns {Promise<API.UpdateTodoResponse>} The todo
   */
  async updateTodo(req, ctx) {
    const { todo } = ctx.state;
    debug("update todo with body %o", req.body);
    await todo.set(req.body).save();
    return { body: plain(todo) };
  }

  /**
   * Delete todo
   *
   * @override
   * @param {API.DeleteTodoRequest} req deleteTodo request
   * @param {API.Context<State>} [ctx] koa context
   */
  async deleteTodo(req, ctx) {
    debug("delete todo with req %o", req);

    const { todo } = ctx.state;
    await todo.softDelete();
  }
}

const service = new Service();
export default service;
