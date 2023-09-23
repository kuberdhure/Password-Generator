import { useCallback, useEffect, useState } from 'react'
import './App.css'

function App() {
  const [passLength,setpassLength] = useState(8);
  const [isNumAllowed,setNumAllowed] = useState(false);
  const [ischarAllowed,setCharAllowed] = useState(false);
  const [password,setPassword] = useState("");

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (isNumAllowed) str += "0123456789"
    if (ischarAllowed) str += "!@#$%^&*-_+=[]{}~`"


    for (let i = 1; i <= passLength; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)
  },[passLength,isNumAllowed,ischarAllowed,setPassword])

  useEffect(()=>{
    passwordGenerator()
  },[passLength,isNumAllowed,ischarAllowed,setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password)
    alert("copied!")
  }, [password])

  return (
    <div>
        <h1 className='text-white text-5xl mb-6 text-center'>Password Generator</h1>
        <div className='w-full max-w-2xl mx-auto rounded-lg p-8 my-4 text-green-500 bg-gray-600'>
            <div className='flex rounded-lg overflow-hidden mb-4 bg-black p-0'>
                <input className='outline-none w-full py-1 px-4 text-2xl font-medium' value={password} readOnly/>
                <button className='p-4 bg-violet-800 font-semibold text-xl' onClick={copyPasswordToClipboard}>Copy</button>
            </div>
            <div className='flex text-2xl font-medium mt-10 gap-x-2 justify-center'>
              <input 
                type='range' 
                name="length" 
                min={8}
                max={100}
                value={passLength}
                onChange={(e)=>setpassLength(e.target.value)}
                className='outline-none'
                />
              <label htmlFor='length'>Length: {passLength}</label>

              <div className="flex items-center gap-x-4">
              
                <input type='checkbox' onChange={()=>setNumAllowed((prev)=>!prev)} name='Numeric' className='w-6 h-6 outline-none text-blue-600 bg-gray-100 border-gray-300 rounded'/>
                <label htmlFor='Numeric'>Numeric</label>
              
                <input type='checkbox' onChange={()=>setCharAllowed((prev)=>!prev)} className='w-6 h-6 outline-none text-blue-600 bg-gray-100 border-gray-300 rounded'/>
                <label htmlFor='Characters'>Characters</label>
  
              </div>
            </div>
        </div>
    </div>
  )
}

export default App
