import { BsFillSuitHeartFill } from "react-icons/bs"

export const Footer = () => (
  <div className="bg-slate-800">
    <p className="p-3 text-slate-100">
      Made with{" "}
      <span className="text-red-600">
        <BsFillSuitHeartFill className="inline" />
      </span>{" "}
      by{" "}
      <a
        href="https://github.com/DanTheOrange"
        className="border-b border-slate-200 hover:border-blue-400 hover:text-blue-300"
      >
        DanTheOrange
      </a>
    </p>
  </div>
)
