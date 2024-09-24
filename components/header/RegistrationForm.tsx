import Link from "next/link";

function RegistrationForm() {
  return (
    <form className="my-2">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="block">Name</label>
          <input id="name" placeholder="Your name" className="w-full bg-black text-white p-2 border border-grey rounded-md focus:outline-none" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="number" className="block">Phone Number</label>
          <input id="number" placeholder="+995" className="w-full bg-black text-white p-2 border border-grey rounded-md focus:outline-none" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="block">Email</label>
          <input id="email" type="email" placeholder="youremail@mail.com" className="w-full bg-black text-white p-2 border border-grey rounded-md focus:outline-none"/>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="block">Password</label>
          <input id="password" type="password" placeholder="********" className="w-full bg-black text-white p-2 border border-grey rounded-md focus:outline-none" />
          <span className="text-sm pl-1 text-[#CBCBCB]">4 or more characters, at least one upper case</span>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="repeat-password" className="block">Repeat Password</label>
          <input id="repeat-password" type="password" placeholder="********" className="w-full bg-black text-white p-2 border border-grey rounded-md focus:outline-none" />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
      <input type="checkbox" id="scales" name="scales" />
        <span className="text-sm">I’ve read and accept the <Link href={'#'} className="text-orange cursor-pointer underline">Privacy Policy</Link></span>
      </div>
    </form>
  );
}

export default RegistrationForm;
