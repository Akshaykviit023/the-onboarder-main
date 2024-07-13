"use client";

import Link from "next/link"
import { Button } from "./ui/button"
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
    const gradientStyle = {
        backgroundImage: '-webkit-linear-gradient(rgb(250 232 255), rgb(112 26 117))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent', 
      };

      const [hover, setHover] = useState(false);

  return (
    <div className="fixed top-0 z-50 bg-black w-full flex justify-center py-4 border-b border-solid border-neutral-800">
        <div className="w-[80%] flex justify-between items-center">
            <h1 className="text-2xl" style={gradientStyle}>The Onboarder</h1>
            <div className="hidden items-center gap-8 md:flex">
                <Link href="/"><p>Product</p></Link>
                <Link href="/"><p>Solutions</p></Link>
                <Link href="/"><p>Resources</p></Link>
            </div>
            <Link href="/sign-in">
            <Button onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="text-black rounded-full bg-fuchsia-300 flex gap-2 items-center">Sign In <ArrowUpRight className={`transition-all ${hover ? "" : "rotate-45"}`} /></Button>
            </Link>
        </div>
    </div>
  )
}

export default Navbar