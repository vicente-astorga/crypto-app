import React from "react";
import { Link } from "react-router-dom";

const CreditCard = ({user, number}) => {

  return (
    <Link to={`/account`} className="font-main font-light">
      <div className="flex gap-2 justify-end aspect-video flex-col bg-button rounded-[15px] p-6">
        {/* <div className="h-36"></div> */}
        <div className="text-2xl">{number}</div>

        <div className="flex justify-between items-center">
          {user?.email ? (
            <div className="text-sm">{user?.email}</div>
          ) : (
            <div className="text-sm">unknown</div>
          )}
          <div className="flex">
            <div className="w-7 h-7 border-[3px] border-text rounded-full"></div>
            <div className="w-7 h-7 border-[3px] border-text rounded-full -ml-3"></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CreditCard;
