import Link from 'next/link';

export default function Navbar() {
  return (
    <>
      <div className="flex justify-between items-center py-4 px-60 bg-white">
        <Link href="/"> <h1 className="text-black">LOGO</h1></Link>
       
        <div className="flex gap-8 list-none">
          <li className="text-black cursor-pointer text-[18px] hover:text-blue-600 font-semibold font-cormorant ">
            Home
          </li>
          <li className="text-black cursor-pointer text-[18px] font-cormorant hover:text-blue-600 font-semibold">
            About Us
          </li>
          <li className="text-black cursor-pointer text-[18px] font-cormorant hover:text-blue-600 font-semibold">
            Pricing
          </li>
          <li className="text-black cursor-pointer text-[18px] font-cormorant hover:text-blue-600 font-semibold">
            Contact
          </li>
        </div>
        <div className="flex gap-4">
          <button className="text-white border px-4 py-2 rounded-xl cursor-pointer bg-blue-600 hover:bg-blue-800">
            Login
          </button>
          <Link href="/registered">
          <button className="text-white border px-4 py-2 rounded-xl cursor-pointer bg-blue-600 hover:bg-blue-800">
            Register
          </button>
          </Link>
        </div>
      </div>
    </>
  );
}
