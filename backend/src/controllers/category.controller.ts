import { Response, Request } from 'express';
import { Category } from '../models/category.model';

import { getCategories } from '../service/category.service';
import { response } from '../utils/response';

export async function getCategoriesController(req: Request, res: Response) {
  try {
    const categories = await getCategories();

    if (categories) {
      return res.status(categories.statusCode).send(categories);
    }
  } catch (error) {
    console.error('An error occurred while fetching categories: ', error);
    return res.status(500).send(response);
  }
}
