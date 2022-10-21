import { BsFillSuitHeartFill } from "react-icons/bs"
// import { AiOutlineCopyrightCircle } from "react-icons/ai"

export const Footer = () => (
  <div className="flex flex-row justify-between bg-slate-800 p-3 text-slate-100">
    <p>
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
    {/* Do I need this? */}
    {/* <p>
      <AiOutlineCopyrightCircle className="-mt-1 inline" /> Daniel James Lewis
      2022
    </p> */}
  </div>
)
