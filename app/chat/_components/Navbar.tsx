
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import UploadModal from "./UploadModal";


const Navbar = () => {
    const gradientStyle = {
        backgroundImage: '-webkit-linear-gradient(rgb(250 232 255), rgb(112 26 117))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent', 
      };


  return (
    <div className="fixed top-0 z-50 bg-background w-full flex justify-center py-4 border-b border-solid border-neutral-800">
        
        <div className="w-[80%] flex justify-between items-center">
            <h1 className="text-2xl" style={gradientStyle}>The Onboarder</h1>
            <div className="flex items-center gap-4 md:gap-8 ">
                
                <UploadModal />
                <UserButton
                appearance={{
                    elements: {
                        avatarBox: {
                            height: 40,
                            width: 40,
                        },
                    },
                }}
                />
            </div>
            
        </div>
    </div>
  )
}

export default Navbar