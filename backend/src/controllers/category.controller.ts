import { Response, Request } from 'express';
import { Category } from '../models/category.model';

import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../service/category.service';
import { serverError } from '../utils/response';

export async function getCategoriesController(
  req: Request,
  res: Response
) {
  try {
    const result = await getCategories();

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
      'An error occurred while getting all categories: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function getCategoryByIdController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid category ID',
    });
  }

  try {
    const result = await getCategoryById(id);

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
      'An error occurred while getting a category by id: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function createCategoryController(
  req: Request,
  res: Response
) {
  const bodyRequest: Category = req.body;

  // ? : check if name is empty
  if (!bodyRequest.name) {
    return res.status(400).send({
      status: 400,
      message: 'Category name is required',
    });
  }

  try {
    const result = await createCategory(bodyRequest);

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
      'An error occurred while creating a category: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function updateCategoryController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid category ID',
    });
  }

  const bodyRequest: Category = req.body;

  // ? : check if name is empty
  if (!bodyRequest.name) {
    return res.status(400).send({
      status: 400,
      message: 'Category name is required',
    });
  }

  try {
    const result = await updateCategory(id, bodyRequest);

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
      'An error occurred while updating a category: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function deleteCategoryController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid category ID',
    });
  }

  try {
    const result = await deleteCategory(id);

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
      'An error occurred while deleting a category: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}
