import React, { useEffect } from 'react';
import { RiDashboard3Line } from "react-icons/ri";
import { PiNotebookFill } from "react-icons/pi";
import { BiBookBookmark } from "react-icons/bi";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { HiOutlineChartPie } from "react-icons/hi";
import { TbSettings2 } from "react-icons/tb";
import logo from '../assets/logo.png';
import { MdOutlineCancel } from "react-icons/md";

const Sidebar = ({ selected, setSelected, sidebarOpen, handleNavigation }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: RiDashboard3Line },
    { id: 'students', label: 'Students', icon: PiNotebookFill },
    { id: 'chapter', label: 'Chapter', icon: BiBookBookmark },
    { id: 'help', label: 'Help', icon: HiOutlineQuestionMarkCircle },
    { id: 'reports', label: 'Reports', icon: HiOutlineChartPie },
    { id: 'settings', label: 'Settings', icon: TbSettings2 },
  ];

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <div
      className={`md:relative fixed top-0 left-0 h-screen transform transition-transform duration-300 md:translate-x-0 ${
        sidebarOpen ? "translate-x-0 z-10" : "-translate-x-full"
      } 2xl:w-1/6 md:w-1/5 w-screen pr-40 bg-white/30 md:p-2`}
    >
      <div className="bg-white p-2 h-screen">
        <div className="absolute top-1/2 right-10 md:hidden" onClick={handleNavigation}>
          <MdOutlineCancel className="w-10 h-10" />
        </div>
        <div className="flex items-center justify-start h-20 border-b">
          <h1 className="text-xl font-bold">
            <img className="ml-2 w-2/3" src={logo} alt="logo" />
          </h1>
        </div>
        <ul className="mt-4 space-y-1">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li
                key={item.id}
                className={`flex items-center px-6 py-3 cursor-pointer rounded-lg ${
                  selected === item.id ? "bg-gray-100 text-black" : "text-gray-500 hover:bg-gray-100"
                }`}
                onClick={() => setSelected(item.id)}
              >
                <IconComponent
                  className={`w-6 h-6 mr-4 ${
                    selected === item.id ? "text-black" : "text-gray-500"
                  }`}
                />
                {item.label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
