import React from 'react'
import Tail from "../assets/tail-spin.svg";

const SpinLoader = ({size}) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
          <img size={size} src={Tail} alt="loader" />
    </div>
  )
}

export default SpinLoader