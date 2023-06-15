import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { stakeholderValidationSchema } from 'validationSchema/stakeholders';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getStakeholders();
    case 'POST':
      return createStakeholder();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getStakeholders() {
    const data = await prisma.stakeholder
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'stakeholder'));
    return res.status(200).json(data);
  }

  async function createStakeholder() {
    await stakeholderValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.headcount_request?.length > 0) {
      const create_headcount_request = body.headcount_request;
      body.headcount_request = {
        create: create_headcount_request,
      };
    } else {
      delete body.headcount_request;
    }
    const data = await prisma.stakeholder.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
