import Airtable, { FieldSet, Records } from "airtable";

export interface RecordFields {
  fsq_id: string;
  name: string;
  totalVotes: number;
  address?: string;
  neighborhood?: string;
  imgUrl?: string;
}

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE as string
);

const table = base("coffee-stores");

const getMinifiedRecord = (record: { fields: RecordFields }) => {
  return {
    ...record.fields,
  };
};

const getMinifiedRecords = (records: []) => {
  return records.map((record) => getMinifiedRecord(record));
};

const findRecordByFilter = async (id: string) => {
  const findCafeStoreRecords: Records<FieldSet> | any = await table
    .select({
      filterByFormula: `fsq_id="${id}"`,
    })
    .firstPage();

  return getMinifiedRecords(findCafeStoreRecords);
};

export { table, getMinifiedRecords, findRecordByFilter };
