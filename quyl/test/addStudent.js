import { faker } from '@faker-js/faker';

// Function to generate mock student data
function generateMockStudentData(numStudents) {
    const cohortOptions = ['AY 2024-25', 'AY 2025-26', 'AY 2026-27', 'AY 2027-28'];
    const classOptions = ["CBSE 8", "CBSE 9", "CBSE 10", "ICSE 8", "ICSE 9", "ICSE 10"];
    const courseOptions = ['Science', 'Math', 'English', 'Social Science'];

    let students = [];
    for (let i = 0; i < numStudents; i++) {
        const student = {
            name: faker.person.fullName(),
            cohort: cohortOptions[Math.floor(Math.random() * cohortOptions.length)],
            standard: classOptions[Math.floor(Math.random() * classOptions.length)],
            courses: Array.from({ length: 3 }, () => courseOptions[Math.floor(Math.random() * courseOptions.length)]),
        };
        students.push(student);
    }
    return students;
}

// Generate and log 100 mock students
const studentsData = generateMockStudentData(100);
console.log(studentsData);

// Optionally, you can write the data to a file (optional)
// import fs from 'fs';
// fs.writeFileSync('mockStudents.json', JSON.stringify(studentsData, null, 2));
