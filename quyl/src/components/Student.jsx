import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchStudents } from "../features/students/studentsSlice";
import {debounce} from 'lodash';
import Select from "react-select";
import { FaPlus } from "react-icons/fa6";
import StudentList from "./Student/StudentList";
import AddStudentForm from "./Student/AddStudentForm";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: '',
    backgroundColor: 'rgb(233, 236, 240)', // Tailwind `bg-gray-100` or `bg-white`,
    borderRadius: '0.5rem', // Tailwind `rounded-lg`
    borderColor: state.isFocused ? 'none' : 'none', // Tailwind `border-gray-400` or `border-gray-200`
    padding: 'px-4 py-[0.4rem]', // Tailwind `p-1`
    boxShadow: state.isFocused ? 'none' : 'none',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'rgb(229, 231, 235)', // Tailwind `bg-gray-200` for hover effect
      borderColor: 'rgb(229, 231, 235)', // Tailwind `text-gray-800` for hover effect
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#3e526e', // Custom text color inside dropdown
    fontWeight: '600'
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: 'rem', // Tailwind `rounded-lg`
    backgroundColor: 'rgb(255 255 255)', // Tailwind `bg-white`
    overflow: 'hidden', // Tailwind `overflow-hidden`
    boxShadow: 'none', // Tailwind `shadow-md`
  }),
  option: (provided, state) => ({
    ...provided,
    borderRadius: '0.5rem',
    backgroundColor: state.isSelected
      ? 'rgb(229 231 235)' // Tailwind `bg-gray-200`
      : state.isFocused
        ? 'rgb(243 244 246)' // Tailwind `bg-gray-100`
        : 'rgb(255 255 255)', // Tailwind `bg-white`
    color: state.isSelected ? 'rgb(17 24 39)' : 'rgb(75 85 99)', // Tailwind `text-gray-800` or `text-gray-600`
    padding: '0.5rem 1rem', // Tailwind `py-2 px-4`
    cursor: 'pointer',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#3e526e', // Custom color for the dropdown icon
    '&:hover': {
      color: '#3e526e', // Ensure color stays same on hover
    },
  }),
};

const yearOptions = [
  { value: "AY 2025-26", label: "AY 2025-26" },
  { value: "AY 2024-25", label: "AY 2024-25" },
  { value: "AY 2023-24", label: "AY 2023-24" },
  { value: "AY 2022-23", label: "AY 2022-23" },
];

const classOptions = [
  { value: "CBSE 8", label: "CBSE 8" },
  { value: "CBSE 9", label: "CBSE 9" },
  { value: "CBSE 10", label: "CBSE 10" },
  { value: "ICSE 8", label: "ICSE 8" },
  { value: "ICSE 9", label: "ICSE 9" },
  { value: "ICSE 10", label: "ICSE 10" },
];

const Student = () => {
  const dispatch = useDispatch();
  const [selectedYear, setSelectedYear] = useState("AY 2024-25");
  const [selectedClass, setSelectedClass] = useState("CBSE 9");
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption ? selectedOption.value : null);
  };

  const handleClassChange = (selectedOption) => {
    setSelectedClass(selectedOption ? selectedOption.value : null);
  };

  const handleFormView = () => {
    setIsAddStudentOpen(!isAddStudentOpen);
  }

  // Debounced version of the fetch function
  const fetchStudentsDebounced = debounce((filters) => {
    console.log("Fetching students with filters (debounced):", filters);
    dispatch(fetchStudents(filters));
  }, 500); // Adjust delay as needed

  useEffect(() => {
    const filters = {
      year: selectedYear,
      class: selectedClass,
    };

    // Call the debounced function
    fetchStudentsDebounced(filters);

    // Cleanup to cancel debounce on unmount
    return () => {
      fetchStudentsDebounced.cancel();
    };
  }, [selectedYear, selectedClass, fetchStudentsDebounced]);

  return (
    <div className="bg-white rounded-lg p-4">
      {/* Filters Section */}
      <div className="flex md:flex-row flex-col justify-between items-center mb-4 gap-2">
        <div className="w-full flex md:gap-4 gap-2 md:text-lg text-md">
          {/* Year Dropdown */}
          <div className="md:w-fit w-1/2">
            <Select
              options={yearOptions}
              value={yearOptions.find((option) => option.value === selectedYear)}
              onChange={handleYearChange}
              placeholder="Select Year"
              styles={customStyles} // Apply custom styles
              classNamePrefix="react-select" // Add custom prefix for styling
            />
          </div>

          {/* Class Dropdown */}
          <div className="md:w-fit w-1/2">
            <Select
              options={classOptions}
              value={classOptions.find((option) => option.value === selectedClass)}
              onChange={handleClassChange}
              placeholder="Select Class"
              styles={customStyles} // Apply custom styles
              classNamePrefix="react-select" // Add custom prefix for styling
            />
          </div>
        </div>

        {/* Add New Student Button */}
        <button
          onClick={handleFormView}
          className="md:w-fit w-full flex justify-center items-center md:gap-2 bg-[#e9ecf0] px-4 md:py-[0.4rem] py-2 md:text-lg text-md text-[#3e526e] text-nowrap font-semibold rounded-lg">
          <FaPlus />
          Add New Student
        </button>
      </div>
      {
        isAddStudentOpen && <AddStudentForm handleFormView={handleFormView} />
      }
      {/* Pass Filters to StudentList */}
      <StudentList selectedYear={selectedYear} selectedClass={selectedClass} />
    </div>
  );
};

export default Student;
