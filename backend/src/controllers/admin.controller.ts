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
  try {
    const admin = req.body as Admin;
    const adminLogin = await loginAdmin(admin);

    if (admin) {
      return res.status(adminLogin.status).send(adminLogin);
    }
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
  try {
    const admin = req.body as Admin;
    const adminCreated = await createAdmin(admin);

    if (adminCreated) {
      return res.status(adminCreated.status).send(adminCreated);
    }
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
    const admins = await getAdmins();

    if (admins) {
      return res.status(admins.status).send(admins);
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
  try {
    const id = parseInt(req.params.id);
    const admin = await getAdminById(id);

    if (admin) {
      return res.status(admin.status).send(admin);
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
  try {
    const id = parseInt(req.params.id);
    const admin = req.body as Admin;

    const adminUpdated = await updateAdmin(id, admin);

    if (adminUpdated) {
      return res.status(adminUpdated.status).send(adminUpdated);
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
  try {
    const id = parseInt(req.params.id);
    const admin = await deleteAdmin(id);

    if (admin) {
      return res.status(admin.status).send(admin);
    }
  } catch (error) {
    console.error('An error occurred while deleting admin: ', error);
    return res.status(serverError.status).send(serverError);
  }
}
