import type { Response, Request } from 'express';
import { Admin } from '../models/admin.model';

import {
  createAdmin,
  loginAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
} from '../service/admin.service';
import { serverError } from '../utils/response';

export async function loginAdminController(
  req: Request,
  res: Response
) {
  const admin = req.body as Admin;

  // ? : check if email and password are provided
  if (!admin.email || !admin.password) {
    return res.status(400).send({
      status: 400,
      message: 'Email and password are required',
    });
  }

  try {
    const result = await loginAdmin(admin);

    // ! : set token in cookie if login is successful
    if (result.status === 200 && result.payload) {
      res.cookie('request_token', result.payload.token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
    }

    return res.status(result.status).send(result);
  } catch (error) {
    console.error(
      'An error occurred while logging in admin: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function createAdminController(
  req: Request,
  res: Response
) {
  const admin = req.body as Admin;

  // ? : check if name, email, and password are provided
  if (!admin.name || !admin.email || !admin.password) {
    return res.status(400).send({
      status: 400,
      message: 'Name, email, and password are required',
    });
  }

  try {
    const result = await createAdmin(admin);

    // ? : check if result doesn't have status or invalid status
    if (
      !result.status ||
      result.status < 200 ||
      result.status >= 300 ||
      typeof result.status !== 'number'
    ) {
      throw new Error('Invalid status code');
    }

    return res.status(result.status).send(result);
  } catch (error) {
    console.error('An error occurred while creating admin: ', error);
    return res.status(serverError.status).send(serverError);
  }
}

export async function getAdminsController(
  req: Request,
  res: Response
) {
  try {
    const result = await getAdmins();

    // ? : check if result doesn't have status or invalid status
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
      'An error occurred while getting all admins: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function getAdminByIdController(
  req: Request,
  res: Response
) {
  const id = parseInt(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid admin ID',
    });
  }

  try {
    const result = await getAdminById(id);

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
      'An error occurred while getting admin by id: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function updateAdminController(
  req: Request,
  res: Response
) {
  const id = parseInt(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid admin ID',
    });
  }

  const admin = req.body as Admin;

  // ? : check if name, email, and password are provided
  if (!admin.name || !admin.email || !admin.password) {
    return res.status(400).send({
      status: 400,
      message: 'Name, email, and password are required',
    });
  }

  try {
    const result = await updateAdmin(id, admin);

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
    console.error('An error occurred while updating admin: ', error);
    return res.status(serverError.status).send(serverError);
  }
}

export async function deleteAdminController(
  req: Request,
  res: Response
) {
  const id = parseInt(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid admin ID',
    });
  }

  try {
    const result = await deleteAdmin(id);

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
    console.error('An error occurred while deleting admin: ', error);
    return res.status(serverError.status).send(serverError);
  }
}
