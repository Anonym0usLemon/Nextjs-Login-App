'use client'; 
import { useFormState } from "react-dom";
import { signUp } from "@/actions/auth";

export default function AuthForm() {
  const [formState, formAction] = useFormState(signUp, {}); 

  return (
    <form action={formAction} className="flex flex-col items-center justify-between gap-6 bg-white p-10 min-h-72 rounded-md">
    <div className="flex flex-col items-center justify-center">
      <div className="mb-4 flex flex-col">
        <label htmlFor="username" className="w-full text-black">Username</label>
        <input type="text" name="email" placeholder="Enter Your Username" id="username" className="bg-gray-100 text-black rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"/>
      </div>
      <div className="mb-4 flex flex-col">
        <label htmlFor="password" className="w-full text-black">Password</label>
        <input type="password" name="password" placeholder="Enter Your Password" id="password" className=" bg-gray-100 text-black rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"/>
      </div>
    </div>
    {formState.errors && (<ul className="text-red-600">
      {Object.keys(formState.errors).map((error) => (
        <li key={error}>{formState.errors[error]}</li>
      ))}
    </ul>)}
    <button type="submit" className="hover:bg-blue-600 transition ease-in-out delay-150 text-white bg-black py-2 px-4 rounded-full">Login</button>
  </form>
  )
}