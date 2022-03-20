import { FieldSet } from "airtable/lib/field_set";
import { NextApiRequest, NextApiResponse } from "next/types";
import {
  findRecordByFilter,
  getMinifiedRecords,
  table,
} from "../../lib/airtable";

const favoriteCafeById = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    try {
      const { fsq_id } = req.body;
      if (fsq_id) {
        const records: any = await findRecordByFilter(fsq_id);

        if (records.length !== 0) {
          const record = records[0];
          const calculateVoting = record.totalVotes + 1;

          //update a record
          const udpateRecord = await table.update([
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
          res.json({ message: `CAFE ID DNE ${fsq_id}` });
        }
      } else {
        res.status(400).json({ message: "id is missing" });
      }
    } catch (error) {
      res.status(500);
      throw new Error("error upvting cafe", error as Error);
    }
  }
};

export default favoriteCafeById;
