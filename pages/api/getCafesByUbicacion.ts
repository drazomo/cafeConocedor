// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// SERVERLESS => dev doesn't require maintance or scaling of a server
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchCafeterias } from "../../lib/cafeterias_lib";

export const getCafesByUbicacion = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  //config latLong && limit
  try {
    const { latLong, limite } = req.query;
    const response = await fetchCafeterias(latLong as string, limite as string);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "BE: Location Error", error: error });
    throw new Error("there is an error", error as Error);
  }
};

export default getCafesByUbicacion;
