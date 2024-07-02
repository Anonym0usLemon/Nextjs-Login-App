export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action="" className="flex flex-col items-center justify-between gap-6 bg-white p-10 min-h-72 rounded-md">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-4 flex flex-col">
            <label htmlFor="username" className="w-full text-black">Username</label>
            <input type="text" placeholder="Enter Your Username" id="username" className="bg-gray-100 text-black rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"/>
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="password" className="w-full text-black">Password</label>
            <input type="password" placeholder="Enter Your Password" id="password" className=" bg-gray-100 text-black rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"/>
          </div>
        </div>
        <button type="submit" className="hover:bg-blue-600 transition ease-in-out delay-150 text-white bg-black py-2 px-4 rounded-full">Login</button>
      </form>
    </main>
  ); 
}