export const listTodosResSchema = {
  additionalProperties: false,
  type: "object",
  required: ["body", "headers"],
  properties: {
    body: {
      type: "array",
      items: {
        allOf: [
          {
            additionalProperties: false,
            type: "object",
            properties: {
              todo: { type: "string", description: "todo" },
              status: { type: "string", enum: ["open", "close"] },
              owner: { type: "string" },
            },
          },
          {
            additionalProperties: false,
            type: "object",
            required: ["id"],
            properties: {
              id: { type: "string" },
              updateAt: { tsType: "Date", type: "string", format: "date-time" },
              updateBy: { type: "string" },
              createAt: { tsType: "Date", type: "string", format: "date-time" },
              createBy: { type: "string" },
            },
          },
        ],
      },
    },
    headers: {
      additionalProperties: false,
      type: "object",
      required: ["x-total-count"],
      properties: { "x-total-count": { type: "integer" } },
    },
  },
};
export const createTodoReqSchema = {
  additionalProperties: false,
  type: "object",
  required: ["body"],
  properties: {
    body: {
      allOf: [
        {
          additionalProperties: false,
          type: "object",
          properties: {
            todo: { type: "string", description: "todo" },
            status: { type: "string", enum: ["open", "close"] },
            owner: { type: "string" },
          },
        },
        {
          additionalProperties: false,
          type: "object",
          required: ["todo"],
          properties: { todo: { type: "string", description: "todo" } },
        },
      ],
    },
  },
};
export const createTodoResSchema = {
  additionalProperties: false,
  type: "object",
  required: ["body"],
  properties: {
    body: {
      allOf: [
        {
          additionalProperties: false,
          type: "object",
          properties: {
            todo: { type: "string", description: "todo" },
            status: { type: "string", enum: ["open", "close"] },
            owner: { type: "string" },
          },
        },
        {
          additionalProperties: false,
          type: "object",
          required: ["id"],
          properties: {
            id: { type: "string" },
            updateAt: { tsType: "Date", type: "string", format: "date-time" },
            updateBy: { type: "string" },
            createAt: { tsType: "Date", type: "string", format: "date-time" },
            createBy: { type: "string" },
          },
        },
      ],
    },
  },
};
export const showTodoByIdReqSchema = {
  additionalProperties: false,
  type: "object",
  required: ["todoId"],
  properties: { todoId: { type: "string", pattern: "[a-f\\d]{24}" } },
};
export const showTodoByIdResSchema = {
  additionalProperties: false,
  type: "object",
  required: ["body"],
  properties: {
    body: {
      allOf: [
        {
          additionalProperties: false,
          type: "object",
          properties: {
            todo: { type: "string", description: "todo" },
            status: { type: "string", enum: ["open", "close"] },
            owner: { type: "string" },
          },
        },
        {
          additionalProperties: false,
          type: "object",
          required: ["id"],
          properties: {
            id: { type: "string" },
            updateAt: { tsType: "Date", type: "string", format: "date-time" },
            updateBy: { type: "string" },
            createAt: { tsType: "Date", type: "string", format: "date-time" },
            createBy: { type: "string" },
          },
        },
      ],
    },
  },
};
export const updateTodoReqSchema = {
  additionalProperties: false,
  type: "object",
  required: ["todoId", "body"],
  properties: {
    todoId: { type: "string", pattern: "[a-f\\d]{24}" },
    body: {
      additionalProperties: false,
      type: "object",
      properties: {
        todo: { type: "string", description: "todo" },
        status: { type: "string", enum: ["open", "close"] },
        owner: { type: "string" },
      },
    },
  },
};
export const updateTodoResSchema = {
  additionalProperties: false,
  type: "object",
  required: ["body"],
  properties: {
    body: {
      allOf: [
        {
          additionalProperties: false,
          type: "object",
          properties: {
            todo: { type: "string", description: "todo" },
            status: { type: "string", enum: ["open", "close"] },
            owner: { type: "string" },
          },
        },
        {
          additionalProperties: false,
          type: "object",
          required: ["id"],
          properties: {
            id: { type: "string" },
            updateAt: { tsType: "Date", type: "string", format: "date-time" },
            updateBy: { type: "string" },
            createAt: { tsType: "Date", type: "string", format: "date-time" },
            createBy: { type: "string" },
          },
        },
      ],
    },
  },
};
export const deleteTodoReqSchema = {
  additionalProperties: false,
  type: "object",
  required: ["todoId"],
  properties: { todoId: { type: "string", pattern: "[a-f\\d]{24}" } },
};
