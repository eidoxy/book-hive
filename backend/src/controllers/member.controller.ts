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
import { response } from '../utils/response';

export async function registerMemberController(
  req: Request,
  res: Response
) {
  try {
    const member = req.body as Member;
    const memberCreated = await registerMember(member);

    if (memberCreated) {
      return res.status(memberCreated.status).send(memberCreated);
    }
  } catch (error) {
    console.error(
      'An error occurred while registering member: ',
      error
    );
    return res.status(500).send(response);
  }
}

export async function loginMemberController(
  req: Request,
  res: Response
) {
  try {
    const member = req.body as Member;
    const memberLogin = await loginMember(member);

    if (memberLogin) {
      return res.status(memberLogin.status).send(memberLogin);
    }
  } catch (error) {
    console.error(
      'An error occurred while logging in member: ',
      error
    );
    return res.status(500).send(response);
  }
}

export async function getMembersController(
  req: Request,
  res: Response
) {
  try {
    const members = await getMembers();

    if (members) {
      return res.status(200).send(members);
    }
  } catch (error) {
    console.error(
      'An error occurred while getting all members: ',
      error
    );
    return res.status(500).send(response);
  }
}

export async function getMemberByIdController(
  req: Request,
  res: Response
) {
  try {
    const id = parseInt(req.params.id);
    const member = await getMemberById(id);

    if (member) {
      return res.status(member.status).send(member);
    }
  } catch (error) {
    console.error(
      'An error occurred while getting member by id: ',
      error
    );
    return res.status(500).send(response);
  }
}

export async function updateMemberController(
  req: Request,
  res: Response
) {
  try {
    const id = parseInt(req.params.id);
    const member = req.body as Member;
    const memberUpdated = await updateMember(id, member);

    if (memberUpdated) {
      return res.status(memberUpdated.status).send(memberUpdated);
    }
  } catch (error) {
    console.error('An error occurred while updating member: ', error);
    return res.status(500).send(response);
  }
}

export async function deleteMemberController(
  req: Request,
  res: Response
) {
  try {
    const id = parseInt(req.params.id);
    const memberDeleted = await deleteMember(id);

    if (memberDeleted) {
      return res.status(memberDeleted.status).send(memberDeleted);
    }
  } catch (error) {
    console.error('An error occurred while deleting member: ', error);
    return res.status(500).send(response);
  }
}
