import { cn } from "@/lib/utils";
import { JetBrains_Mono } from "next/font/google"
import Image from "next/image";

const jetBrainsFont = JetBrains_Mono({ 
    subsets: ["latin"], 
    weight: [
      "100",
      "200",
      "300",
      "400",
      "500",
      "600",
      "700",
      "800",
    ] 
  });

    const gradientStyle = {
      backgroundImage: 'linear-gradient(to right, rgb(250 232 255), rgb(112 26 117))',
      backgroundClip: 'text',
      textFillColor: 'transparent',
      color: 'transparent', // Fallback for browsers that don't support backgroundClip
    };

const About = () => {
  return (
    <div className="py-16 flex justify-center">
        <div className="w-[80%] py-16">
            <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 ">
            <div className="bg-neutral-800 bg-gradient-to-br from-neutral-600 to-neutral-950 rounded-2xl p-8 ">
                <h1 className={cn(jetBrainsFont.className, "text-2xl ")}>POWERED BY <span style={gradientStyle}>GEMINI AI</span></h1>
                <p className="text-neutral-400 py-8 mb-16">Gemini AI enhances The Onboarder by leveraging advanced NLP and AI capabilities to deliver precise, contextually relevant information. It enables accurate query interpretation, intelligent content extraction from Google Drive, and personalized responses. This ensures an effective, engaging, and continually improving onboarding experience for new employees.</p>
                <div className="relative overflow-hidden w-full h-56 rounded-b-xl">
                <Image 
                src="/geminiImg.jpg"
                alt="noImg"
                fill={true}
                objectFit="cover"
                />
                </div> 
            </div>
            <div className="bg-neutral-800 bg-gradient-to-br from-neutral-600 to-neutral-950 rounded-2xl p-8">
                <p className={cn(jetBrainsFont.className, "text-2xl ")}>POWERED BY GEMINI AI</p>
            </div>
            </div>
            <div className="bg-fuchsia-900 bg-gradient-to-br from-purple-600 to-purple-950 rounded-2xl p-8">
                <p className={cn(jetBrainsFont.className, "text-2xl ")}>TECH STACKS LEVERAGED</p>
            </div>
            </div>
        </div>
    </div>
  )
}

export default About