import { useState, useCallback, useEffect } from "react"
import { Eye, EyeOff, Copy } from "lucide-react"
import "./App.css"

function App() {
  const [length, setLength] = useState(12)
  const [number, setNumber] = useState(true)
  const [symbol, setSymbol] = useState(true)
  const [uppercase, setUppercase] = useState(true)
  const [lowercase, setLowercase] = useState(true)
  const [password, setPassword] = useState("")
  const [visible, setVisible] = useState(false)

  // Generate password
  const handleGeneratePassword = () => {
    let charlist = ""
    if (lowercase) charlist += "abcdefghijklmnopqrstuvwxyz"
    if (uppercase) charlist += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (number) charlist += "0123456789"
    if (symbol) charlist += "!@#$%^&*()_+"

    setPassword(createPassword(charlist))
  }

  const createPassword = (charlist) => {
    if (!charlist) return ""
    let pass = ""
    const charlistlength = charlist.length
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charlistlength)
      pass += charlist.charAt(randomIndex)
    }
    return pass
  }

  // Auto-generate on first load
  useEffect(() => {
    handleGeneratePassword()
  }, [])

  // Copy with useCallback
  const copy = useCallback(() => {
    if (password) {
      window.navigator.clipboard.writeText(password)
        .then(() => alert("Password copied ✅"))
        .catch((err) => console.error("Copy failed", err))
    }
  }, [password])

  return (
    <div className="min-h-screen max-w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
       {/* Card here */}
      <div className="w-full max-w-lg bg-slate-800 rounded-2xl p-6 shadow-2xl">
        {/* Heading */}
        <h2 className="text-3xl text-center text-teal-300 mb-6">
          🔐 Password Generator
        </h2>

        {/* Password display + copy */}
        <div className="flex items-center bg-slate-700 rounded-xl overflow-hidden mb-6">
          <input
            type={visible ? "text" : "password"}
            placeholder="password"
            className="flex-1 bg-transparent text-lg text-white px-4 py-3 outline-none"
            value={password}
            readOnly
          />
          <button
            onClick={() => setVisible(!visible)}
            className="p-3 text-teal-300 hover:text-white transition"
          >
            {visible ? <Eye /> : <EyeOff />}
          </button>
          <button
            onClick={copy}
            className="p-3 text-teal-300 hover:text-white transition"
          >
            <Copy />
          </button>
        </div>

        {/* Length slider */}
        <div className="mb-6">
          <label className="text-white block mb-2 text-sm font-medium">
            Password Length:{" "}
            <span className="font-bold text-teal-300">{length}</span>
          </label>
          <input
            type="range"
            min={6}
            max={30}
            value={length}
            className="w-full accent-teal-400"
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3 bg-slate-700 rounded-xl p-4 text-white mb-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={lowercase}
              onChange={(e) => setLowercase(e.target.checked)}
              className="accent-teal-400"
            />
            Lowercase
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="accent-teal-400"
            />
            Uppercase
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={number}
              onChange={(e) => setNumber(e.target.checked)}
              className="accent-teal-400"
            />
            Numbers
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={symbol}
              onChange={(e) => setSymbol(e.target.checked)}
              className="accent-teal-400"
            />
            Symbols
          </label>
        </div>

        {/* Generate button */}
        <button
          className="w-full py-3 rounded-xl text-lg font-semibold bg-gradient-to-r from-teal-500 to-blue-600 text-white hover:from-teal-400 hover:to-blue-500 active:scale-95 transition"
          onClick={handleGeneratePassword}
        >
          Generate Password
        </button>
      </div>
    </div>  
  )
}

export default App
