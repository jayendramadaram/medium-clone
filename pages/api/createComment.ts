// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '@sanity/client'
const config = {
  dataset: 'production',
  projectId: 'gmsvszje',
  apiVersion: '2022-05-05',
  useCdn: true,
  token: process.env.SANITY_API,
}
const client = sanityClient(config)

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id, name, email, comment } = JSON.parse(req.body)

  try {
    await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id,
      },
      name,
      email,
      comment,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Ooops i slept' })
  }

  res.status(200).json({ name: 'John Doe' })
}
