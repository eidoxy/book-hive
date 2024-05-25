import { Request, Response } from 'express';
import { Stock } from '../models/stock.model';

import {
  getStocks,
  getStockById,
  createStock,
  updateStock,
  deleteStock,
} from '../service/stock.service';
import { serverError } from '../utils/response';

export async function getStocksController(
  req: Request,
  res: Response
) {
  try {
    const result = await getStocks();

    // ? : check if result is doesn't have status or invalid status
    if (
      result &&
      result.status >= 200 &&
      result.status < 300 &&
      typeof result.status == 'number'
    ) {
      return res.status(result.status).send(result);
    } else {
      throw new Error('Invalid status code');
    }
  } catch (error) {
    console.error(
      'An error occurred while getting all stocks: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function getStockByIdController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid stock ID',
    });
  }

  try {
    const result = await getStockById(id);

    // ? : check if result doesn't have status or invalid status
    if (
      result.status &&
      result.status >= 200 &&
      result.status < 300 &&
      typeof result.status == 'number'
    ) {
      return res.status(result.status).send(result);
    } else {
      throw new Error('Invalid status code');
    }
  } catch (error) {
    console.error(
      'An error occurred while getting a stock by id: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function createStockController(
  req: Request,
  res: Response
) {
  const bodyRequest: Stock = req.body;

  // ? : check if books_id and quantity is empty and not a number
  if (
    !bodyRequest.books_id ||
    !bodyRequest.quantity ||
    isNaN(bodyRequest.books_id) ||
    isNaN(bodyRequest.quantity)
  ) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid stock data',
    });
  }

  try {
    const result = await createStock(bodyRequest);

    // ? : check if result doesn't have status or invalid status
    if (
      result.status &&
      result.status >= 200 &&
      result.status < 300 &&
      typeof result.status == 'number'
    ) {
      return res.status(result.status).send(result);
    } else {
      throw new Error('Invalid status code');
    }
  } catch (error) {
    console.error(
      'An error occurred while creating a stock: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function updateStockController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid stock ID',
    });
  }

  const bodyRequest: Stock = req.body;

  // ? : check if books_id and quantity is empty and not a number
  if (
    !bodyRequest.books_id ||
    !bodyRequest.quantity ||
    typeof bodyRequest.books_id !== 'number' ||
    typeof bodyRequest.quantity !== 'number'
  ) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid stock data',
    });
  }

  try {
    const result = await updateStock(id, bodyRequest);

    // ? : check if result doesn't have status or invalid status
    if (
      result.status &&
      result.status >= 200 &&
      result.status < 300 &&
      typeof result.status == 'number'
    ) {
      return res.status(result.status).send(result);
    } else {
      throw new Error('Invalid status code');
    }
  } catch (error) {
    console.error(
      'An error occurred while updating a stock: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function deleteStockController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid stock ID',
    });
  }

  try {
    const result = await deleteStock(id);

    // ? : check if result doesn't have status or invalid status
    if (
      result.status &&
      result.status >= 200 &&
      result.status < 300 &&
      typeof result.status == 'number'
    ) {
      return res.status(result.status).send(result);
    } else {
      throw new Error('Invalid status code');
    }
  } catch (error) {
    console.error(
      'An error occurred while deleting a stock: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}
