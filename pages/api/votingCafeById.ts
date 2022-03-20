import { NextApiRequest, NextApiResponse } from "next/types";
import { findRecordByFilter } from "../../lib/airtable";

const votingCafeById = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { id } = req.body;
    try {
      if (id) {
        const records = await findRecordByFilter(id as string);

        if (records.length !== 0) {
          res.json(records);
        } else {
          res.json({ message: "id DNE " });
        }
      }

      res.json({ id });
    } catch (err) {
      throw new Error("BE: Voting Error", err as Error);
    }
  }
};

export default votingCafeById;
