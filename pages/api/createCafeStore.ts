import { FieldSet, Records } from "airtable";
import { NextApiRequest, NextApiResponse } from "next";
import { getMinifiedRecords, table } from "../../lib/airtable";

const createCafeStore = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { fsq_id, name, neighborhood, address, imgUrl, totalVotes } =
      req.body;
    //find a record
    try {
      if (fsq_id) {
        const findCafeStoreRecords: Records<FieldSet> | any = await table
          .select({
            filterByFormula: `fsq_id="${fsq_id}"`,
          })
          .firstPage();

        if (findCafeStoreRecords.length !== 0) {
          const records = getMinifiedRecords(findCafeStoreRecords);

          res.json(records);
        } else {
          //create a record
          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  fsq_id,
                  name,
                  totalVotes,
                  address,
                  neighborhood,
                  imgUrl,
                },
              },
            ]);
            const recordFields = createRecords.map((record) => {
              return {
                ...record.fields,
              };
            });
            res.json({ message: "create a record", records: recordFields });
          } else {
            res.status(400).json({ message: "name is missing" });
          }
        }
      } else {
        res.status(400).json({ message: "id is missing" });
      }
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "error creating or finding store", error });
      throw new Error(error);
    }
  }
};

export default createCafeStore;
