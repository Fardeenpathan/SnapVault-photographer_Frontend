import Image from "next/image";
import HomePage from "./home/page.jsx";

import LoginForm from "../components/LoginForm.jsx";
export default function Home() {
  return (
    <div className="flex flex-col font-sans">
      
      <HomePage/>
      <LoginForm/>

    </div>
  );
}
