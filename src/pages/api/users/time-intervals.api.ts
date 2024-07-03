import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const TimeIntervalBodySchema = z.object({
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
  console.log('entrou na função handler de time-intervals.api')
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

  const { intervals } = TimeIntervalBodySchema.parse(req.body)

  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          week_day: interval.weekday,
          time_start_in_minutes: interval.startTimeMinutes,
          time_end_in_minutes: interval.endTimeMinutes,
          user_id: session.user?.id,
        },
      })
    }),
  )

  return res.status(201).end()
}