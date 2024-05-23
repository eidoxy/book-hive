import { Request, Response } from 'express';
import { Stock } from '../models/stock.model';

import {
  getStocks,
  getStockById,
  createStock,
  updateStock,
  deleteStock,
} from '../service/stock.service';
import { response } from '../utils/response';

export async function getStocksController(
  req: Request,
  res: Response
) {
  try {
    const stocks = await getStocks();

    if (stocks) {
      return res.status(stocks.status).send(stocks);
    }
  } catch (error) {
    console.error('An error occurred while fetching stocks: ', error);
    return res.status(500).send(response);
  }
}

export async function getStockByIdController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    const stock = await getStockById(id);

    if (stock) {
      return res.status(stock.status).send(stock);
    }
  } catch (error) {
    console.error(
      'An error occurred while fetching a stock: ',
      error
    );
    return res.status(500).send(response);
  }
}

export async function createStockController(
  req: Request,
  res: Response
) {
  try {
    const bodyRequest: Stock = req.body;
    const stock = await createStock(bodyRequest);

    if (stock) {
      return res.status(stock.status).send(stock);
    }
  } catch (error) {
    console.error(
      'An error occurred while creating a stock: ',
      error
    );
    return res.status(500).send(response);
  }
}

export async function updateStockController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    const bodyRequest: Stock = req.body;
    const stock = await updateStock(id, bodyRequest);

    if (stock) {
      return res.status(stock.status).send(stock);
    }
  } catch (error) {
    console.error(
      'An error occurred while updating a stock: ',
      error
    );
    return res.status(500).send(response);
  }
}

export async function deleteStockController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    const stock = await deleteStock(id);

    if (stock) {
      return res.status(stock.status).send(stock);
    }
  } catch (error) {
    console.error(
      'An error occurred while deleting a stock: ',
      error
    );
    return res.status(500).send(response);
  }
}
