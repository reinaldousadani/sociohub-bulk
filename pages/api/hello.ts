// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name?: string,
  error?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // return res.json({
  //   name: "Reinaldo"
  // })

  return res.status(200).json({
    name: "Reinaldo"
  })
}
