import { Request, Response } from 'express';
import { QueryResult } from 'pg';

import { pool } from '../database';

export const getTodos = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const todos: QueryResult = await pool.query('SELECT * FROM todos');
    return res.status(200).json({ todos: todos.rows });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getTodoById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);
    const todo: QueryResult = await pool.query(
      'SELECT * FROM todos WHERE id = $1',
      [id]
    );

    if (todo.rows.length === 0) {
      return res.status(404).json({ message: 'Todo does not exist' });
    }
    return res.status(200).json(todo.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const addTodo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name } = req.body;
    const todo: QueryResult = await pool.query(
      'INSERT INTO todos (name) VALUES ($1)',
      [name]
    );
    return res.status(201).json({
      message: 'Todo created',
      todo: {
        name,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);
    const { name, done } = req.body;
    await pool.query(`UPDATE todos SET name = $1, done = $2 WHERE id = $3`, [
      name,
      done,
      id,
    ]);

    return res.json({ message: `Todo ${id} updated` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM todos WHERE id = $1', [id]);

    return res.json({ message: `Todo ${id} has been deleted` });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
