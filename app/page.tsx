import { getUsers } from "@/lib/data";

export default async function Cart() {
  const rows = await getUsers();

  return (
    <div>
      {rows?.map((row) => (
        <div key={row.id}>
          {row.name} - {row.email}
        </div>
      ))}
    </div>
  );
}