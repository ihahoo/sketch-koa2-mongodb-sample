import createError from "http-errors";

import { Todo } from "../models";

/**
 * 中间件
 * 根据 todoId 加载 todo
 *
 * @param {import("koa").Context} ctx koa context
 * @param {import("koa").Next} next koa next
 */
export default async (ctx, next) => {
  const { todoId } = ctx.params;
  ctx.state.todo = await Todo.get(todoId);
  if (!ctx.state.todo) {
    throw new createError.NotFound(`todo ${todoId} not found`);
  }
  await next();
};
