import { useState } from 'react'


const COLORS = [
  {id:'1', name:'Red', value:'red', textColor:'white'},
  {id:'2', name:'Green', value:'green', textColor:'white'},
  {id:'3', name:'Blue', value:'blue', textColor:'white'},
  {id:'4', name:'Olive', value:'olive', textColor:'white'},
  {id:'5', name:'Gray', value:'gray', textColor:'white'},
  {id:'6', name:'Yellow', value:'yellow', textColor:'black'},
  {id:'7', name:'Pink', value:'pink', textColor:'black'},
  {id:'8', name:'Purple', value:'purple', textColor:'white'},
  {id:'9', name:'Lavender', value:'lavender', textColor:'black'},
  {id:'10', name:'White', value:'white', textColor:'black'},
  {id:'11', name:'Black', value:'black', textColor:'white'},
]

function App() {
  const [color, setColor] = useState('olive');
  return (
    <>
    <div className='w-full h-screen duration-200 relative' style={{backgroundColor:color}}>
       
       <div className='absolute inset-x-0 bottom-0 px-10 flex items-center justify-center pb-10'>
         <div className='flex items-center bg-white px-6 py-5 rounded-10 rounded-xl'>
          {COLORS.map((item,index)=>{
            return(
              <button key={item.id} 
                type='button' 
                className='rounded-8 px-5 py-2 mx-2 rounded-xl border-1' 
                style={{color:item.textColor,backgroundColor:item.value}}  
                onClick={()=> setColor(item.value)}>
                {item.name}
               </button>
            )

          })}
          
         </div>

       </div>
 
    </div>
      
    </>
  )
}

export default App;
