import Airtable from "airtable";
import { FieldSet } from "airtable/lib/field_set";
import { Records } from "airtable/lib/records";

interface AirtableData {
  address: string;
  fsq_id: string;
  imgUrl: string;
  name: string;
  recordId: string;
  totalVotes: number;
}

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE as string
);

const table = base("coffee-stores");

const getMinifiedRecord = (record: { id: any; fields: any }) => {
  return {
    recordId: record.id,
    ...record.fields,
  };
};

const getMinifiedRecords = (records: Records<FieldSet>) => {
  return records.map((record) => getMinifiedRecord(record));
};

const findRecordByFilter = async (id: string) => {
  const findCafeStoreRecords = await table
    .select({
      filterByFormula: `fsq_id="${id}"`,
    })
    .firstPage();

  return getMinifiedRecords(findCafeStoreRecords);
};

export { table, getMinifiedRecords, findRecordByFilter };
