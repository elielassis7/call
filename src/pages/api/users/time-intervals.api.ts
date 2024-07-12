import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const timeIntervalBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekday: z.number(),
      startTimeMinutes: z.number(),
      endTimeMinutes: z.number(),
    }),
  ),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) {
    return res.status(401).end()
  }
  console.log(req.body)
  console.log(req.body.data)
  const { intervals } = timeIntervalBodySchema.parse(req.body)

  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          week_day: interval.weekday,
          time_start_in_minutes: interval.startTimeMinutes,
          time_end_in_minutes: interval.endTimeMinutes,
          user_id: session.user.id,
        },
      })
    }),
  )

  return res.status(201).end()
}
