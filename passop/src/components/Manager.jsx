import react from 'react'
import { useRef } from 'react'
import eye from './eye.svg'
import eyecross from './eyecross.svg'
import copy from './copy.svg'
import edit from './edit.svg'
import deleteicon from './delete.svg'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const id = uuidv4()




const Manager = () => {
    const [form, setForm] = useState({
        site: '',username: '',password: ''
    })

    const getpasswords = async () => {
        let req = await fetch("https://passop-1m9a.onrender.com/")
        let passwords = await req.json()
        setpasswordArray(passwords)
        console.log(passwords)
    }

useEffect(() => {
    getpasswords()
}, [])

const [passwordArray, setpasswordArray] = useState([])
const ref = useRef()
const passwordref = useRef()

const showPassword = (params) => {
    if (passwordref.current.type === "password") {
        passwordref.current.type = "text"
        ref.current.src = eye
        toast.info("show password")

    }
    else {

        passwordref.current.type = "password"
        ref.current.src = eyecross
        toast.info("hide password")
    }

}


const copyText = (text) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
}
const savePassword = async (params) => {
    if (form.site.length >= 3 && form.username.length >= 3 && form.password.length >= 3) {

         await fetch("https://passop-1m9a.onrender.com/", {
            method: "DELETE", headers: {  "Content-Type": "application/json"},
            body: JSON.stringify({ id: form.id })
        })
    
          await fetch("https://passop-1m9a.onrender.com/", {
            method: "POST", headers: {  "Content-Type": "application/json"},
            body: JSON.stringify({ ...form, id })
        })

        setpasswordArray([...passwordArray, { ...form, id }])

        setForm({site: "",username: "",password: ""
        })
    }
}



const DeletePassword = async (id) => {
    let c = confirm("Are you sure you want to delete this password?")
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id))    
        let res = await fetch(`https://passop-1m9a.onrender.com`, {
            method: "DELETE", headers: {  "Content-Type": "application/json"},
            body: JSON.stringify({ id })
        })
  

        // localStorage.setItem('passwords', JSON.stringify(passwordArray.filter((item) => item.id !== id)))
        toast.success("Password Deleted")
    }
}
const EditPassword =  (id) => {


    const password = passwordArray.filter(i => i.id === id)[0]
    setForm({ ...passwordArray.filter(i => i.id === id)[0], id: id })
    setpasswordArray(passwordArray.filter((item) => item.id !== id))
}



const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
}


return (
    <>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        <div className="min-h-screen w-full">
            <div className="fixed inset-0 -z-10 w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
            </div>
            <div className="w-full max-w-4xl mx-auto p-4 sm:px-6 lg:px-8 py-6">
                <h1 className="text-4xl font-bold text-center"> PassOP</h1>
                <p className="text-center font-bold"> Your Password Manager </p>
                <div className="text-white flex flex-col p-4 gap-3">
                    <input value={form.site} onChange={handleChange} type="text" placeholder="Enter Website URL" className="bg-white rounded-2xl text-black border-2 border-purple-300 w-full py-1 p-4" name="site" id="" />
                    <div className="flex gap-3">
                        <input value={form.username} onChange={handleChange} placeholder="Enter Username" className="border-purple-300 py-1 p-4 gap-2 w-full rounded-2xl bg-white text-black border-2" type="text" name="username" id="" />
                        <div className="relative flex">
                           
                            <input ref={passwordref} type="password" value={form.password} onChange={handleChange}autoComplete="new-password" placeholder="Enter Password" className="border-purple-300 py-1 p-4 gap-2 w-full rounded-2xl apperarance-none bg-white text-black border-2" name="password" id="" />
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer flex" onClick={showPassword}>
                                <img src={eyecross} ref={ref} alt="" width="16" height="16" />
                            </span>
                        </div>


                    </div>

                    <button onClick={savePassword} className='text-black flex mx-auto py-1.5 bg-purple-400 px-4 hover:font-bold border-purple-300 rounded-full hover:bg-purple-500 justify-center items-center gap-2'>< lord-icon
                        src="https://cdn.lordicon.com/vjgknpfx.json"
                        trigger="hover" width="30px" height="15px">
                    </lord-icon> Add Password</button>

                </div>
                <div className="passwords">
                    <h2 className="text-xl font-bold py-4"> Your passwords</h2>
                    {passwordArray.length === 0 && <div> No Passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full t">
                        <thead className="bg-purple-500 text-white">
                            <tr>
                                <th className="py-2">Site</th>
                                <th className="py-2">UserName</th>
                                <th className="py-2">Password</th>
                                <th className="py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-purple-300">
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className="border border-white py-2 text-center w-32">{item.site}<a href={item.site.startsWith('http') ? item.site : `https://${item.site}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Visit</a>
                                        <button className="ml-7 cursor-pointer" onClick={() => { copyText(item.site) }}>
                                            <img src={copy} alt="Copy" />
                                        </button>
                                    </td>

                                    <td className="border border-white py-2 text-center w-32">{item.username}
                                        <button className="ml-7 cursor-pointer" onClick={() => { copyText(item.username) }}>
                                            <img src={copy} alt="Copy" />
                                        </button>
                                    </td>
                                    <td className="border border-white py-2 text-center w-32">{"*".repeat(item.password.length)}
                                        <button className="ml-7 cursor-pointer" onClick={() => { copyText(item.password) }}>
                                            <img src={copy} alt="Copy" />
                                        </button>
                                    </td>
                                    <td className="border border-white py-2 text-center w-32">
                                        <span>
                                            <button className="ml-2 mx-1 cursor-pointer hover:font-extrabold" onClick={() => { DeletePassword(item.id) }}>
                                                <img src={deleteicon} alt="Delete" />
                                            </button>
                                            <button className="ml-2 mx-1 cursor-pointer hover:font-extrabold" onClick={() => { EditPassword(item.id) }}>
                                                <img src={edit} alt="Edit" />
                                            </button>
                                        </span>

                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </div>
    </>
)
}
export default Manager  
