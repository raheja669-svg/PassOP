import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-purple-300 flex items-center justify-between px-4 h-18" >
      <div className="logo font-bold">PassOP </div>
      <ul className="flex space-x-4">
        <li><a className=" hover:font-bold" href="#">Home</a></li>
        <li><a className=" hover:font-bold" href="#">About</a></li>
        <li><a className=" hover:font-bold" href="#">Contact</a></li>
      </ul>

      <button className='text-black flex py-1.5 bg-purple-400 px-4 hover:font-bold border-purple-300 rounded-full hover:bg-purple-500 justify-center items-center gap-2'>
        <img className="w-9 h-9" src="/src/components/github.svg" alt="GitHub" />
        Github
      </button>

    </nav>
  )
}

export default Navbar
