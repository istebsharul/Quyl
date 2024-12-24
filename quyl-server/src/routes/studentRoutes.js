import express from 'express';
import Student from '../model/Student.js';

const router = express.Router();

// Fetch all students
router.get('/', async (req, res) => {
  try {
    console.log('Fetching students with filters:', req.query);
    const year = req.query.year;
    const selected_class = req.query.class;
    console.log('Year:', year);
    console.log('Class:', selected_class);
    const students = await Student.find({cohort: year, standard: selected_class});
    console.log('Students fetched:', students);
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Error fetching students' });
  }
});

// Add a new student
router.post('/', async (req, res) => {
  try {
    const { name, cohort, standard, courses } = req.body;
    console.log('Adding a new student:', { name, cohort, standard, courses });

    const student = new Student({ name, cohort, standard, courses, date_joined: new Date() });
    await student.save();

    console.log('Student added:', student);
    res.status(201).json(student);
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Error adding student' });
  }
});

// Update student
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  console.log(`Updating student with ID: ${id}`);
  console.log('Updates:', updates);

  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, updates, { new: true });
    console.log('Updated student:', updatedStudent);
    res.json(updatedStudent);
  } catch (error) {
    console.error(`Error updating student with ID: ${id}`, error);
    res.status(500).json({ message: 'Error updating student' });
  }
});

// Delete student
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Deleting student with ID: ${id}`);

  try {
    await Student.findByIdAndDelete(id);
    console.log(`Student with ID: ${id} deleted`);
    res.status(204).send();
  } catch (error) {
    console.error(`Error deleting student with ID: ${id}`, error);
    res.status(500).json({ message: 'Error deleting student' });
  }
});


router.post('/add-student', async (req, res) => {
  try {
      // Assuming the data is sent in the request body as an array of students
      const students = req.body;

      // Validate that the body contains an array
      if (!Array.isArray(students)) {
          return res.status(400).json({ error: 'Data must be an array of students' });
      }

      // Example of processing each student (validation, saving to database, etc.)
      const studentPromises = students.map(async (student) => {
          // Validate the student data
          if (!student.name || !student.cohort || !student.standard || !student.courses) {
              throw new Error('Name, cohort, standard, and courses are required for each student');
          }

          // Example: Ensure 'courses' is an array
          if (!Array.isArray(student.courses)) {
              throw new Error('Courses must be an array');
          }

          // Assuming a Student model to insert into the database
          // This part can be replaced by your actual database logic
          const newStudent = new Student({
              name: student.name,
              cohort: student.cohort,
              standard: student.standard,
              courses: student.courses,  // Array of courses
          });

          // Save the student to the database
          await newStudent.save();
      });

      // Wait for all student save operations to complete
      await Promise.all(studentPromises);

      // Respond with success
      res.status(201).json({ message: 'Students added successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message || 'An error occurred while adding students' });
  }
});


export default router;
