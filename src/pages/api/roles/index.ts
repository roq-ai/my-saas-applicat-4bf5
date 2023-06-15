import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { roleValidationSchema } from 'validationSchema/roles';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getRoles();
    case 'POST':
      return createRole();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getRoles() {
    const data = await prisma.role
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'role'));
    return res.status(200).json(data);
  }

  async function createRole() {
    await roleValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.headcount_request?.length > 0) {
      const create_headcount_request = body.headcount_request;
      body.headcount_request = {
        create: create_headcount_request,
      };
    } else {
      delete body.headcount_request;
    }
    if (body?.stakeholder?.length > 0) {
      const create_stakeholder = body.stakeholder;
      body.stakeholder = {
        create: create_stakeholder,
      };
    } else {
      delete body.stakeholder;
    }
    const data = await prisma.role.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
