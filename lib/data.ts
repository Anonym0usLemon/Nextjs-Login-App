import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function getUsers() {
  noStore(); // Prevents NextJs from caching the data. 

  try {
    const { rows } = await sql`SELECT * from USERS`;
    return rows; 

  } catch (error) {
    console.error("Database Error: " + error);
    throw new Error('Failed to fetch user data');
  }
}