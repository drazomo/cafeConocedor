import { NextApiRequest, NextApiResponse } from "next/types";
import {
  findRecordByFilter,
  getMinifiedRecords,
  table,
} from "../../lib/airtable";

const favoriteCafeById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;
  if (req.method === "PUT") {
    try {
      if (id) {
        const records = await findRecordByFilter(id);

        if (records.length !== 0) {
          const record = records[0];
          const calculateVoting = record.totalVotes + 1;

          console.log({ calculateVoting });

          //update a record
          const udpateRecord: any = await table.update([
            {
              id: record.recordId,
              fields: {
                totalVotes: calculateVoting,
              },
            },
          ]);

          if (udpateRecord) {
            const miniRecords = getMinifiedRecords(udpateRecord);
            res.json(miniRecords);
          }
        } else {
          res.json({ message: `CAFE ID DNE ${id}` });
        }
      } else {
        res.status(400).json({ message: "id is missing" });
      }
    } catch (error: any) {
      res.status(500);
      throw new Error("error upvting cafe", error.message);
    }
  }
};

export default favoriteCafeById;
