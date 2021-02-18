import { Context, Middleware } from "koa";
import Router, { RouterContext } from "koa-tree-router";

declare namespace API {
  export interface ListTodosResponse {
    body: ({
      /**
       * todo
       */
      todo?: string;
      status?: "open" | "close";
      owner?: string;
    } & {
      id: string;
      updateAt?: Date;
      updateBy?: string;
      createAt?: Date;
      createBy?: string;
    })[];
    headers: {
      "x-total-count": number;
    };
  }
  export interface CreateTodoRequest {
    body: {
      /**
       * todo
       */
      todo?: string;
      status?: "open" | "close";
      owner?: string;
    } & {
      /**
       * todo
       */
      todo: string;
    };
  }
  export interface CreateTodoResponse {
    body: {
      /**
       * todo
       */
      todo?: string;
      status?: "open" | "close";
      owner?: string;
    } & {
      id: string;
      updateAt?: Date;
      updateBy?: string;
      createAt?: Date;
      createBy?: string;
    };
  }
  export interface ShowTodoByIdRequest {
    todoId: string;
  }
  export interface ShowTodoByIdResponse {
    body: {
      /**
       * todo
       */
      todo?: string;
      status?: "open" | "close";
      owner?: string;
    } & {
      id: string;
      updateAt?: Date;
      updateBy?: string;
      createAt?: Date;
      createBy?: string;
    };
  }
  export interface UpdateTodoRequest {
    todoId: string;
    body: {
      /**
       * todo
       */
      todo?: string;
      status?: "open" | "close";
      owner?: string;
    };
  }
  export interface UpdateTodoResponse {
    body: {
      /**
       * todo
       */
      todo?: string;
      status?: "open" | "close";
      owner?: string;
    } & {
      id: string;
      updateAt?: Date;
      updateBy?: string;
      createAt?: Date;
      createBy?: string;
    };
  }
  export interface DeleteTodoRequest {
    todoId: string;
  }
  type Context<StateT, CustomT = {}> = RouterContext<StateT, CustomT>;
}

declare class API {
  middleware(operation: string): Array<Middleware>;
  bind(router: Router): API;
  listTodos(ctx: API.Context): Promise<API.ListTodosResponse>;
  createTodo(req: API.CreateTodoRequest, ctx: API.Context): Promise<API.CreateTodoResponse>;
  showTodoById(req: API.ShowTodoByIdRequest, ctx: API.Context): Promise<API.ShowTodoByIdResponse>;
  updateTodo(req: API.UpdateTodoRequest, ctx: API.Context): Promise<API.UpdateTodoResponse>;
  deleteTodo(req: API.DeleteTodoRequest, ctx: API.Context): Promise<void>;
}

export = API;
