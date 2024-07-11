'use server';
import { getUserByEmail } from "@/lib/data";
import { Errors } from "@/lib/interfaces";
import { unstable_noStore as noStore } from "next/cache";
import bcrypt from "bcrypt"; 
import { createAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function signUp(prevState: any, formData: FormData): Promise<any> {
  noStore();

  const email: any = formData?.get('email');
  const password: any = formData?.get('password'); 

  console.log(password);

  let errors: Errors = {};

  if (!email.includes('@')) {
    errors.email = 'Please enter a valid email address.';    
  }
  if (password.trim().length < 6) {
    errors.password = 'Password must be at least 8 characters long.'
  }
  if (Object.keys(errors).length > 0) {
    return { 
      errors, 
    }; 
  }
  // FormData validated
}

export async function login(prevState: any, formData: FormData): Promise<any> {
  const email: any = formData?.get('email');
  const password: any = formData?.get('password');

  const user: any = await getUserByEmail(email); 
  // console.log( await getUserByEmail(email));

  if (!user) {
    return {
      errors: {
        email: 'Could not authenticate user, please check your credentials.'
      }
    }
  }

  // console.log(user.id + " " + user.email + " " + user.password);
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return {
      errors: {
        password: 'Could not authenticate user, please check your credentials.'
      }
    }
  }
  console.log(user.id)

  await createAuthSession(user.id);
  redirect('/new-post');
}
