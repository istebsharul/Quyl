import React from 'react';
import { FaRegCircleQuestion } from "react-icons/fa6";
import { LiaCommentDots } from "react-icons/lia";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { BiBell } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = ({handleNavigation}) => {
    return (
        <header className="flex items-center justify-between md:px-6 md:py-6 p-3 bg-[#f7f8fb]">
            <GiHamburgerMenu onClick={handleNavigation} className='w-8 h-8 md:hidden sm:block mr-3' />

            {/* Search Bar */}
            <div className="flex items-center w-1/2 bg-white rounded-xl px-4 py-2">
                <IoSearch className="text-gray-500 w-5 h-5 mr-3" />
                <input
                    type="text"
                    placeholder="Search your course"
                    className="w-full py-1 text-gray-700 bg-transparent focus:outline-none focus:ring-0 focus:ring-gray-500"
                />
            </div>


            <div className='w-1/2 flex justify-end items-center md:space-x-12 space-x-6'>
                {/* Icons */}
                <div className="md:w-2/5 w-3/5 flex justify-between items-center text-gray-600">
                    <FaRegCircleQuestion className="w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-800" title="Info" />
                    <LiaCommentDots className="w-7 h-7 cursor-pointer text-gray-500 hover:text-gray-800" title="Comments" />
                    <TbAdjustmentsHorizontal className="w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-800" title="Adjust" />
                    <BiBell className="w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-800" title="Notifications" />
                </div>

                {/* User Profile */}
                <div className="w-fit flex justify-end items-center space-x-6">
                    <img
                        src="data:image/jpeg;base64,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" // Replace with a real image URL
                        alt="User"
                        className="w-10 h-10 rounded-xl"
                    />
                    <span className="text-gray-700 font-semibold md:block hidden">Md Istebsharul Bari </span>
                </div>
            </div>
        </header>
    );
};

export default Header;
