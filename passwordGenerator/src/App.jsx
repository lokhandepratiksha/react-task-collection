
import { use, useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState('8');
  const [number, setNumber] = useState('false');
  const [charactor, setCharactor] = useState('false');

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if(number) str += '0123456789';
    if(charactor) str += '!#~$%^&*(_)/|\+=?{}[]``'
    

    for(let i = 0; i<=length ; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  },[length,number,charactor,setPassword]);

  const copyPasswordClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,99);
    window.navigator.clipboard.writeText(password);

  },[password]);

  useEffect(()=>{
    passwordGenerator()
  },[length,number,charactor])

  return (
    <>
    <div className='bg-black h-screen '>
       <h1 className='text-white text-4xl text-center'>Password Generator</h1>
       <div className='w-full max-w-md bg-gray-800 mx-auto shodow-md rounded-lg p-8 my-8 text-orange-500'>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type='text' className='outline-none w-full py-1 px-3 bg-white' 
          value={password}
          ref={passwordRef}
          placeholder='password'  readOnly/>
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer' 
                 onClick={copyPasswordClipboard}> Copy </button>
        </div>
        <div className='flex text-sm gap-x-2'>
             <div className='flex items-center gap-x-1'>
                <input type='range' min={6} max={100} className='cursor-pointer'  
                value={length} onChange={(e)=>setLength(e.target.value)}/>
                <label>Length : {length} </label>
             </div>
             <div className='flex item-center gap-x-1'>
                <input type='checkbox' value={number} onChange={()=>setNumber((prev)=>!prev)}/>
                <label>Number</label>
             </div>
             <div className='flex item-center gap-x-1'>
                <input type='checkbox' value={charactor} onChange={()=>setCharactor((prev)=> !prev)}/>
                <label>Charactor</label>
             </div>
          </div>
       </div>
    </div>
     
    </>
  )
}

export default App
