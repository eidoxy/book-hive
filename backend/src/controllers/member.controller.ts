import { Request, Response } from 'express';
import { Member } from '../models/member.model';

import {
  registerMember,
  loginMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
} from '../service/member.service';
import { serverError } from '../utils/response';

export async function registerMemberController(
  req: Request,
  res: Response
) {
  const member = req.body as Member;

  // ? : check if email and password are provided
  if (!member.email || !member.password) {
    return res.status(400).send({
      status: 400,
      message: 'Email and password are required',
    });
  }

  try {
    const result = await registerMember(member);

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
    console.error('An error occurred while registering member: ', error);
    return res.status(serverError.status).send(serverError);
  }
}

export async function loginMemberController(req: Request, res: Response) {
  const member = req.body as Member;

  // Check if email and password are provided
  if (!member.email || !member.password) {
    return res.status(400).send({
      status: 400,
      message: 'Email and password are required',
    });
  }

  try {
    const result = await loginMember(member);

    // ? : check if result doesn't have status or invalid status
    if (result.status === 200 && result.payload) {
      res.cookie('token', result.payload.token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        // sameSite: 'none',
      });
    }

    return res.status(result.status).send(result);
  } catch (error) {
    console.error('An error occurred while logging in member: ', error);
    return res.status(serverError.status).send(serverError);
  }
}

export async function getMembersController(req: Request, res: Response) {
  try {
    const result = await getMembers();

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
    console.error('An error occurred while getting all members: ', error);
    return res.status(serverError.status).send(serverError);
  }
}

export async function getMemberByIdController(
  req: Request,
  res: Response
) {
  const id = parseInt(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid id',
    });
  }

  try {
    const result = await getMemberById(id);

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
    console.error('An error occurred while getting member by id: ', error);
    return res.status(serverError.status).send(serverError);
  }
}

export async function updateMemberController(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid id',
    });
  }

  const member = req.body as Member;

  // ? : check if name, email, password, phone are provided
  if (!member.name || !member.email || !member.password || !member.phone) {
    return res.status(400).send({
      status: 400,
      message: 'Name, email, password, and phone are required',
    });
  }

  try {
    const result = await updateMember(id, member);

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
    console.error('An error occurred while updating member: ', error);
    return res.status(serverError.status).send(serverError);
  }
}

export async function deleteMemberController(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid id',
    });
  }

  try {
    const result = await deleteMember(id);

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
    console.error('An error occurred while deleting member: ', error);
    return res.status(serverError.status).send(serverError);
  }
}
