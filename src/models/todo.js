import mongoose from "mongoose";
import { helper } from "@36node/mongoose-helper";

export const todoSchema = new mongoose.Schema({
  todo: { type: String, required: true },
  owner: mongoose.SchemaTypes.ObjectId,
  status: { type: String, enum: ["open", "close"] },
});

/**
 * @typedef {Object} TodoDoc
 * @property {string} todo - todo
 * @property {"open"|"close"} [status] - 状态
 */

/**
 * @typedef {mongoose.Document & TodoDoc & Todo} TodoDocument
 */

/**
 * TODO: 弥补遗憾
 *
 * 遗憾: Todo内部无法实现语法提示
 */
class Todo {
  /**
   * static function example
   *
   * @returns {Promise<Array<TodoDocument>>}
   */
  static foo() {
    return null;
  }

  /**
   * @param {TodoCreateDoc} doc - some param
   */
  method(doc) {}
}

todoSchema.pre("save", async function() {
  // console.log("pre save *********************");
});

todoSchema.loadClass(Todo);
todoSchema.plugin(helper);

/**
 * @typedef {mongoose.Model<TodoDocument, Todo>} TodoModel
 */

/**
 * @type {TodoModel & typeof Todo}
 */
const Model = mongoose.model("Todo", todoSchema);

export default Model;
