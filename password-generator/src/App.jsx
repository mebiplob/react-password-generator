import { useState, useCallback, useEffect, useRef} from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null);

  const copyPassword = useCallback(() => {
     passwordRef.current?.select()
     window.navigator.clipboard.writeText(password)
  }, [password]);


  const passwordGenerator = useCallback(() =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "[~!#$%^&*(){}]"

    for (let index = 1; index < length; index++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed])

  useEffect(()=>{passwordGenerator()}, [length, numberAllowed, charAllowed, passwordGenerator])

  

  return (
    <>
      <div className='password_body h-screen w-full bg-black flex justify-center items-center'>
        <div className='passgenholder py-6 px-9 bg-slate-300 rounded-md'>
          <h1 className='text-4xl text-black'>Password Generator</h1>


          <div className='password_container'>
            <input 
            type="text"
            value={password}
            placeholder='Password'
            readOnly
            ref={passwordRef}
            />
            <button onClick={copyPassword} className=' bg-black text-white px-3 py-1'>Copy</button>
          </div>

          <div className='gen_dependency flex'>
            <input 
            type="range"
            value={length}
            min={8}
            max={100}
            onChange= {(e) => {setLength(e.target.value)}}
            />
            <label>Length {length}</label>
          </div>

          <div className='gen_dependency flex'>
            <input 
            type="checkbox"
            defaultValue={numberAllowed}
            onChange= {() => {setNumberAllowed( (prev) => !prev)} }
            />
            <label>Number {numberAllowed}</label>
          </div>


          <div className='gen_dependency flex'>
            <input 
            type="checkbox"
            defaultValue={charAllowed}
            onChange= {() => {setNumberAllowed( (prev) => !prev)} }
            />
            <label>Number {charAllowed}</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
