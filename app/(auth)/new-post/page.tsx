import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const result = await verifyAuth();
  if (!result.user) { 
    return redirect('/login'); 
  }

  return (
    <p>Add new gallery image.</p>
  );
}