export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action="" className="flex flex-col items-center justify-between gap-6 bg-white p-10 min-h-72 rounded-md">
        <div className="flex flex-col items-center justify-center">
          <input type="text" placeholder="Username" className="bg-gray-100 text-black rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"/>
          <input type="password" placeholder="Password" className="mt-3 bg-gray-100 text-black rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"/>
        </div>
        <button type="submit" className="hover:bg-blue-600 transition ease-in-out delay-150 text-white bg-black py-2 px-4 rounded-full">Login</button>
      </form>
    </main>
  ); 
}