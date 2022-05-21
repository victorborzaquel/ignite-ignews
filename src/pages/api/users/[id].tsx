import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  const users = [
    { id: 1, name: "victor" },
    { id: 2, name: "mattos" },
    { id: 3, name: "hugo" },
  ]

  return res.json(users)
}