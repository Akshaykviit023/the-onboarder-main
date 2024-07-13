
import Navbar from "./_components/Navbar"
import Textbox from "./_components/Textbox"

const page = () => {
    let apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

  return (
    <div>
        <Navbar />
        <Textbox apiKey={apiKey} />
    </div>
  )
}

export default page