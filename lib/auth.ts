import { Lucia } from "lucia";
import { PostgresJsAdapter } from "@lucia-auth/adapter-postgresql";
import postgres from "postgres";
import { cookies } from "next/headers";
import { db } from "@vercel/postgres";

const connectionString: any = process.env.POSTGRES_URL;
const sql = postgres(connectionString);

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
export async function createAuthSession(userId: string) {
   console.log(userId); 
   try {
      const session = await lucia.createSession(userId, {}); // Creates the database session in your postres database
      const sessionCookie = lucia.createSessionCookie(session.id) // Creates the session cookie
      // Sets the cookie
      cookies().set( 
         sessionCookie.name, 
         sessionCookie.value, 
         sessionCookie.attributes
      );
   } catch (error) {
      console.log(error); 
   }
}

// For when you have to verify the user on a protected route. 
export async function verifyAuth() {
   const sessionCookie = cookies().get(lucia.sessionCookieName);
   if (!sessionCookie) {
      return {
         user: null,
         session: null
      };
   }

   const sessionId = sessionCookie.value; 
   if (!sessionId) {
      return {
         user: null,
         session: null
      };
   }

   const result: any = lucia.validateSession(sessionId); 
   // refresh session if user is logged in. 
   try {
      if (result.session && result.session.fresh) {
         const sessionCookie = lucia.createSessionCookie(result.session.id) 
         cookies().set( 
            sessionCookie.name, 
            sessionCookie.value, 
            sessionCookie.attributes
         );
      }
      if (!result.session) {
         const sessionCookie = lucia.createBlankSessionCookie(); 
         cookies().set( 
            sessionCookie.name, 
            sessionCookie.value, 
            sessionCookie.attributes
         );
      }
   } catch {/* Ignore errors, don't set the cookie */}

   return result;
}

export async function destroySession() {
   const {session} = await verifyAuth() 
   if (!session) {
      return {
         error: 'Unauthorized!'
      }
   }

   await lucia.invalidateSession(session.id);
   const sessionCookie = lucia.createBlankSessionCookie(); 
   cookies().set( 
      sessionCookie.name, 
      sessionCookie.value, 
      sessionCookie.attributes
   );
}
