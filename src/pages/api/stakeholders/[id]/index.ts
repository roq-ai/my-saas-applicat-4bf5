import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { stakeholderValidationSchema } from 'validationSchema/stakeholders';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.stakeholder
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getStakeholderById();
    case 'PUT':
      return updateStakeholderById();
    case 'DELETE':
      return deleteStakeholderById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getStakeholderById() {
    const data = await prisma.stakeholder.findFirst(convertQueryToPrismaUtil(req.query, 'stakeholder'));
    return res.status(200).json(data);
  }

  async function updateStakeholderById() {
    await stakeholderValidationSchema.validate(req.body);
    const data = await prisma.stakeholder.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteStakeholderById() {
    const data = await prisma.stakeholder.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
