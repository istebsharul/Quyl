import React from "react";
import { useSelector } from "react-redux";
import { FaFlask, FaCalculator, FaBook, FaGlobe } from "react-icons/fa"; // Import icons

const StudentList = ({ selectedYear, selectedClass }) => {
  const students = useSelector((state) => state.students.students || []); // Ensure fallback to empty array


  const subjectIcons = {
    Science: <FaFlask className="text-blue-500 mr-2" />,
    Math: <FaCalculator className="text-green-500 mr-2" />,
    History: <FaBook className="text-red-500 mr-2" />,
    Geography: <FaGlobe className="text-yellow-500 mr-2" />,
  };

  function getSubject(sentence) {
    const words = sentence.split(/\s+/);
    return words[words.length - 1];
  }

  function getFormattedDate (inputDate){
    const date = new Date(inputDate);

    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }
  
  function formatDateTime(inputDate) {
    const date = new Date(inputDate);

    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  
    const formattedTime = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // To display AM/PM
    });
  
    return `${formattedDate}, ${formattedTime}`;
  }
  

  return (
    <div className="mt-6">
      {students.length > 0 ? (
        <>
          {/* Desktop View */}
          <div className="overflow-x-auto md:block hidden">
            <table className="min-w-full table-auto border-collapse sm:table-fixed">
              <thead>
                <tr className="text-sm font-bold hidden sm:table-row">
                  <th className="py-2 text-left text-gray-700">Student Name</th>
                  <th className="py-2 text-left text-gray-700">Cohort</th>
                  <th className="py-2 text-left text-gray-700">Courses</th>
                  <th className="py-2 text-left text-gray-700">Date Joined</th>
                  <th className="py-2 text-left text-gray-700">Last Login</th>
                  <th className="py-2 text-center text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student?._id} className="border-t text-sm font-normal">
                    <td className="py-2">{student?.name || "N/A"}</td>
                    <td className="py-2">{student?.cohort || "N/A"}</td>
                    <td className="py-2 flex gap-2 flex-wrap overflow-hidden">
                      {student?.courses?.map((course, index) => (
                        <div
                          key={index}
                          className="flex items-center px-3 py-1 bg-gray-100 rounded-lg shadow-sm text-sm text-gray-700"
                        >
                          {subjectIcons[getSubject(course)] || (
                            <FaBook className="text-gray-400 mr-2" />
                          )}
                         <span className="mr-1">{student?.standard || "N/A"}</span>{course}
                        </div>
                      ))}
                    </td>
                    <td className="py-2">{getFormattedDate(student?.date_joined) || "N/A"}</td>
                    <td className="py-2">{formatDateTime(student?.last_login) || "N/A"}</td>
                    <td className="py-2 flex justify-center">
                      <div
                        className={`w-5 h-5 rounded-full inline-block ${student?.status === "online"
                          ? "bg-[#4AEA40]"
                          : "bg-red-500"
                          }`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden">
            {students.map((student) => (
              <div key={student.id} className="border-t p-2">
                <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold">{student?.name || "N/A"}</h3>
                    <p className="text-sm text-gray-600">
                      Cohort: {student?.cohort || "N/A"}
                    </p>
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full mt-2 inline-block ${student?.status === "online"
                      ? "bg-[#4AEA40]"
                      : "bg-red-500"
                      }`}
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  {student?.courses?.map((course, index) => (
                    <div
                      key={index}
                      className="flex items-center px-3 py-1 bg-gray-100 rounded-lg shadow-sm text-sm text-gray-700"
                    >
                      {subjectIcons[getSubject(course)] || (
                        <FaBook className="text-gray-400 mr-2" />
                      )}
                      {course}
                    </div>
                  ))}
                </div>
                <p className="text-sm mt-2">
                  Date Joined: {student?.date_joined || "N/A"}
                </p>
                <p className="text-sm">Last Login: {student?.last_login || "N/A"}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">No students found.</p>
      )}
    </div>
  );
};

export default StudentList;
