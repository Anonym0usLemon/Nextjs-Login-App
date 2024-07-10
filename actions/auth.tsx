'use server';
import { Errors } from "@/lib/interfaces";
import { unstable_noStore as noStore } from "next/cache";

export async function signUp(prevState: any, formData: FormData): Promise<any> {
  noStore();

  const email = formData?.get('email');
  const password = formData?.get('password'); 

  console.log(password);

  let errors: Errors = {};

  if (!email.includes('@')) {
    errors.email = 'Please enter a valid email address.';    
  }
  if (password.trim().length < 8) {
    errors.password = 'Password must be at least 8 characters long.'
  }
  if (Object.keys(errors).length > 0) {
    return { 
      errors, 
    }; 
  }

  // FormData validated
}