import { Lucia } from "lucia";
import { PostgresJsAdapter } from "@lucia-auth/adapter-postgresql";
import postgres from "postgres";
import { cookies } from "next/headers";

const sql = postgres();

// These are the tables Lucia Auth will need access to in order to authenticate the user. 
const adapter = new PostgresJsAdapter(sql, {
	user: "users",
	session: "sessions"
});

// Create the Lucia instance needed to validate users. The second argument is a configuration object.
// Right now I'm using it to set the session and enforce HTTPS in production.
const lucia = new Lucia(adapter, {
   sessionCookie: {
      expires: false,
      attributes: {
         secure: process.env.NODE_ENV === 'production'
      }
   }
})

// call when you want to authenticate a user. (you can pass email instead of user id if that works better) 
export async function createAuthSession(userId: any) {
   const session = await lucia.createSession(userId, {}); // Creates the database session in your postres database
   const sessionCookie = lucia.createSessionCookie(session.id) // Creates the session cookie
   // Sets the cookie
   cookies().set( 
      sessionCookie.name, 
      sessionCookie.value, 
      sessionCookie.attributes
   );
}