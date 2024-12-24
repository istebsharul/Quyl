import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStudent } from '../../features/students/studentsSlice';
import { RxCross2 } from 'react-icons/rx';
import Select from 'react-select';

// Predefined cohort options
const cohortOptions = ['AY 2024-25', 'AY 2025-26', 'AY 2026-27', 'AY 2027-28'];

// Predefined class options
const classOptions = [
    { value: "CBSE 8", label: "CBSE 8" },
    { value: "CBSE 9", label: "CBSE 9" },
    { value: "CBSE 10", label: "CBSE 10" },
    { value: "ICSE 8", label: "ICSE 8" },
    { value: "ICSE 9", label: "ICSE 9" },
    { value: "ICSE 10", label: "ICSE 10" },
];


// Predefined course options for multi-select dropdown
const courseOptions = [
    { value: 'Science', label: 'Science' },
    { value: 'Math', label: 'Math' },
    { value: 'English', label: 'English' },
    { value: 'Social Science', label: 'Social Science' },
];

// Custom styles for the Select components
const customStyles = {
    control: (base) => ({
        ...base,
        borderColor: '#B0BEC5', // Light grey border
        backgroundColor: '#F5F5F5', // Very light grey background
        color: '#374151', // Dark grey text
        borderRadius: '0.375rem',
        padding: '0.1rem',
        boxShadow: 'none',
        ':hover': {
            borderColor: '#4B5563', // Dark grey border on hover
            boxShadow: 'none', // No box shadow on hover
        },
    }),
    multiValue: (base) => ({
        ...base,
        backgroundColor: '#E0E0E0', // Light grey for selected items
        color: '#374151', // Dark grey text
        borderRadius: '0.375rem',
    }),
    multiValueLabel: (base) => ({
        ...base,
        color: '#374151', // Dark grey text
    }),
    multiValueRemove: (base) => ({
        ...base,
        color: '#374151', // Dark grey text
        cursor: 'pointer',
        ':hover': {
            backgroundColor: '#D32F2F', // Subtle red for hover
            color: '#FFFFFF', // White text on hover
        },
    }),
    option: (base) => ({
        ...base,
        backgroundColor: '#F5F5F5', // Light grey background
        color: '#374151', // Dark grey text
        padding: '0.7rem',
        '&:hover': {
            backgroundColor: '#E0E0E0', // Slightly darker grey for hover
            color: '#000000', // Black text on hover
        },
    }),
    menu: (base) => ({
        ...base,
        backgroundColor: '#FFFFFF', // White dropdown background
        borderColor: '#B0BEC5', // Light grey border
    }),
    placeholder: (base) => ({
        ...base,
        color: '#9E9E9E', // Medium grey placeholder text
    }),
    singleValue: (base) => ({
        ...base,
        color: '#374151', // Dark grey selected value
    }),
};

function AddStudentForm({ handleFormView }) {
    const dispatch = useDispatch();
    const [student, setStudent] = useState({
        name: '',
        cohort: '',
        standard: '',
        courses: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!student.name || !student.cohort || !student.standard || student.courses.length === 0) {
            alert('Please fill all the fields');
            return;
        }
        dispatch(addStudent(student));
        setStudent({ name: '', cohort: '', standard: '', courses: [] });
    };

    // Handle course selection change
    const handleCourseSelect = (selectedCourses) => {
        setStudent((prevState) => {
            const courses = selectedCourses ? selectedCourses.map((course) => course.value) : [];
            return { ...prevState, courses };
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 shadow-lg rounded-lg p-8 md:w-full w-4/5  max-w-md space-y-2"
        >
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-semibold text-center text-gray-800">Add Student</h2>
                <RxCross2 className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" onClick={handleFormView} />
            </div>
            <label className="block text-sm font-medium text-gray-700">Select Name</label>
            <input
                type="text"
                placeholder="Name"
                id="name"
                value={student.name}
                onChange={(e) => setStudent({ ...student, name: e.target.value })}
                className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring- focus:ring-blue-500"
            />

            {/* Single select for cohort */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Select Cohort</label>
                <Select
                    options={cohortOptions.map((cohort) => ({ value: cohort, label: cohort }))}
                    value={student.cohort ? { value: student.cohort, label: student.cohort } : null}
                    onChange={(selectedOption) => setStudent({ ...student, cohort: selectedOption ? selectedOption.value : '' })}
                    className="basic-single-select"
                    classNamePrefix="select cohort"
                    styles={customStyles}
                />
            </div>

            {/* Select for Class */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Select Class</label>
                <Select
                    options={classOptions}
                    value={student.standard ? { value: student.standard, label: student.standard } : null}
                    onChange={(selectedOption) => setStudent({ ...student, standard: selectedOption ? selectedOption.value : '' })}
                    className="basic-single-select"
                    classNamePrefix="select"
                    styles={customStyles}
                />
            </div>
            {/* Multi select for courses */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Courses</label>
                <Select
                    isMulti
                    name="courses"
                    options={courseOptions}
                    value={courseOptions.filter((option) => student.courses.includes(option.value))}
                    onChange={handleCourseSelect}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    styles={customStyles}
                />
                <div className="text-sm text-gray-500 mt-2">
                    {student.courses.length === 0
                        ? 'No courses selected'
                        : `Selected courses: ${student.courses.join(', ')}`}
                </div>
            </div>

            <button
                type="submit"
                className="w-full py-3 bg-gray-600 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Add Student
            </button>
        </form>
    );
}

export default AddStudentForm;
