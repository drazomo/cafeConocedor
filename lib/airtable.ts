import Airtable from "airtable";

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

export { table, getMinifiedRecords };
