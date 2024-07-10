'use client';

import AuthForm from "../ui/login/auth-form";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthForm/>
    </main>
  ); 
}