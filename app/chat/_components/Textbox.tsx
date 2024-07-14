"use client";

//import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send } from "lucide-react";
import { useState, useEffect } from "react";



const Textbox = () => {

  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [collectionName, setCollectionName] = useState('');

  // Load collectionName from localStorage when the component mounts
  useEffect(() => {
    const storedCollectionName = localStorage.getItem('collectionName');
    if (storedCollectionName) {
      setCollectionName(storedCollectionName);
    }
  }, []);

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


const queryDB = async () => {
  try {
    
    const response = await fetch('/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, collection_name: collectionName }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json().catch(() => null);
    if (data) {
      setAnswer(data.answer);
      console.log(data.answer);
    } else {
      console.log('No data returned');
    }
  } catch (error) {
    console.error('Failed to query database:', error);
  }
};

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
                <Send className="text-fuchsia-400" onClick={queryDB} />
            </div>
        </div>
        
    </div>
  )
}

export default Textbox