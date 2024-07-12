import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const timeIntervalBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeMinutes: z.number(),
      endTimeMinutes: z.number(),
    }),
  ),
})

type TimeIntervalBodyData = z.infer<typeof timeIntervalBodySchema>

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

  const data: TimeIntervalBodyData = req.body
  const intervals = data.intervals

  console.log(intervals)

  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          week_day: interval.weekDay,
          time_start_in_minutes: interval.startTimeMinutes,
          time_end_in_minutes: interval.endTimeMinutes,
          user_id: session.user.id,
        },
      })
    }),
  )

  return res.status(201).end()
}
