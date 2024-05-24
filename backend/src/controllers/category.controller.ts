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
    const categories = await getCategories();

    if (categories) {
      return res.status(categories.status).send(categories);
    }
  } catch (error) {
    console.error(
      'An error occurred while fetching categories: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function getCategoryByIdController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    const category = await getCategoryById(id);

    if (category) {
      return res.status(category.status).send(category);
    }
  } catch (error) {
    console.error(
      'An error occurred while fetching a category: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function createCategoryController(
  req: Request,
  res: Response
) {
  try {
    const bodyRequest: Category = req.body;
    const category = await createCategory(bodyRequest);

    if (category) {
      return res.status(category.status).send(category);
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
  try {
    const id = Number(req.params.id);
    const bodyRequest: Category = req.body;
    const category = await updateCategory(id, bodyRequest);

    if (category) {
      return res.status(category.status).send(category);
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
  try {
    const id = Number(req.params.id);
    const category = await deleteCategory(id);

    if (category) {
      return res.status(category.status).send(category);
    }
  } catch (error) {
    console.error(
      'An error occurred while deleting a category: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}
