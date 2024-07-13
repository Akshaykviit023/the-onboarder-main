import Image from "next/image"
import { Button } from "./ui/button";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";

const Banner = () => {
        const gradientStyle = {
          backgroundImage: 'linear-gradient(to right, rgb(250 232 255), rgb(112 26 117))',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          color: 'transparent',
        };

        const shadowStyle = {
            boxShadow: 'rgba(244, 114, 182, 0.4) 0px 30px 90px', 
          };

  return (
    <div className="mt-40">

        <div className="w-[80%] mx-auto py-16 mb-40">
            <h1 className="text-6xl font-semibold text-center" style={gradientStyle}>The Ultimate AI Brand-Book Onboarding Partner</h1>
            <p className="text-center text-neutral-400 w-4/5 mx-auto mt-8">Your Interactive Guide to Company Branding and Style. Discover, Learn, and Navigate with AI-powered insights from <span className="text-white cursor-pointer hover:underline ">The Onboarder</span>. Simplify your onboarding journey with expert guidance on company policies, brand identity, and more. Get started today and streamline your path to success!</p>
            <div className="flex justify-center pt-16">
                <Link href="/sign-up">
                <Button variant="secondary" 
                style={shadowStyle}
                className="bg-background text-lg border border-solid border-neutral-600 text-fuchsia-300 rounded-full p-8 flex gap-2">
                    Get Started <ChevronsRight />
                </Button>
                </Link>
            </div>
        </div>
        
        <div className="h-72 overflow-hidden relative">
            <Image 
            src="/bannerImg.jpg"
            alt="noImg"
            fill={true}
            objectFit="cover"
            />

            <h1 className="absolute text-5xl text-primary   -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4">Onboarding Made <span className="italic">Easier.</span></h1>
        </div>
    </div>
  )
}

export default Banner