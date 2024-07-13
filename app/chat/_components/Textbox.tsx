"use client";

//import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send } from "lucide-react";
import { useState } from "react";



const Textbox = ({ apiKey } : { apiKey : string}) => {

    const [query, setQuery] = useState<string>("");

    const shadowStyle = {
        boxShadow: 'rgba(244, 114, 182, 0.4) 0px 20px 90px', 
      };

      //const genAI = new GoogleGenerativeAI(apiKey);

//const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

// async function run() {
//     let newQuery = query;
//     setQuery("");
//     const result = await model.generateContent(newQuery);
//     const response = await result.response;
//     const text = response.text();
//     console.log(text);

    
//   }


  return (
    <div className="fixed bottom-8 w-full">
        <div className="flex justify-center items-center relative">
        <textarea 
        style={shadowStyle} 
        placeholder="Ask Queries" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="relative rounded-full outline-none resize-none  bg-background border border-solid border-neutral-800 text-neutral-400 px-8 pt-4 w-[80%] md:w-[60%]  ">
            
        </textarea>
        <div className="absolute bottom-2 right-[11vw]  rounded-full p-3 flex justify-center items-center cursor-pointer md:right-[21vw]" >
                <Send className="text-fuchsia-400" />
            </div>
        </div>
    </div>
  )
}

export default Textbox