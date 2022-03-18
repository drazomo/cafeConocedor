import { NextApiRequest, NextApiResponse } from "next";
import { findRecordByFilter } from "../../lib/airtable";

const getCafeById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    if (id) {
      const records = await findRecordByFilter(id as string);

      if (records.length !== 0) {
        res.json(records);
      } else {
        res.json({ message: `id DNE ${id}` });
      }
    } else {
      res.status(404).json({ message: "id is missing" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error });
    throw new Error("Something went wrong", error);
  }
};

export default getCafeById;
