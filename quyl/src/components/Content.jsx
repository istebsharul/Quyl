import React from 'react';
import Header from './Header';
import StudentList from './Student';


const Content = ({ selected,handleNavigation }) => {
    const contentMap = {
        dashboard: <h2 className="text-xl font-bold">Welcome to the Dashboard</h2>,
        students: <StudentList/>,
        chapter: <h2 className="text-xl font-bold">Chapter Details</h2>,
        help: <h2 className="text-xl font-bold">Help & Support</h2>,
        reports: <h2 className="text-xl font-bold">View Reports</h2>,
        settings: <h2 className="text-xl font-bold">Settings</h2>,
    };

    return (
        <div className=" flex-1 bg-[#f7f8fb]">
            <Header handleNavigation={handleNavigation}/>
            <div className='px-6'>
                {contentMap[selected] || <h2 className="text-xl font-bold">Please select a menu item</h2>}
            </div>
        </div>
    );
};

export default Content;
