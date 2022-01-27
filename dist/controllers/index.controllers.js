"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodoById = exports.getTodos = void 0;
const database_1 = require("../database");
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield database_1.pool.query('SELECT * FROM todos');
        return res.status(200).json({ todos: todos.rows });
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getTodos = getTodos;
const getTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const todo = yield database_1.pool.query('SELECT * FROM todos WHERE id = $1', [id]);
        if (todo.rows.length === 0) {
            return res.status(404).json({ message: 'Todo does not exist' });
        }
        return res.status(200).json(todo.rows);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getTodoById = getTodoById;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const todo = yield database_1.pool.query('INSERT INTO todos (name) VALUES ($1)', [name]);
        return res.status(201).json({
            message: 'Todo created',
            todo: {
                name,
            },
        });
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.addTodo = addTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { name, done } = req.body;
        yield database_1.pool.query(`UPDATE todos SET name = $1, done = $2 WHERE id = $3`, [
            name,
            done,
            id,
        ]);
        return res.json({ message: `Todo ${id} updated` });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        yield database_1.pool.query('DELETE FROM todos WHERE id = $1', [id]);
        return res.json({ message: `Todo ${id} has been deleted` });
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteTodo = deleteTodo;
