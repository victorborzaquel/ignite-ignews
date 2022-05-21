import { NextApiRequest, NextApiResponse } from "next";

// JWT (Storage) [Local]
// Next Auth (Social) [Server Next]
// Cognito, Auth8 [Externo]

export default (req: NextApiRequest, res: NextApiResponse) => {
  const users = [
    { id: 1, name: "victor" },
    { id: 2, name: "mattos" },
    { id: 3, name: "hugo" },
  ]

  return res.json(users)
}