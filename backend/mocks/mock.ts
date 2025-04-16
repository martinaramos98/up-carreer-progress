import { loadDBClient } from "../src/db/dbController.ts";
export async function setDBMockData(){
  const client = await loadDBClient(); 
}