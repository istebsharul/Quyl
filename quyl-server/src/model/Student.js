import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true }, // Trim added
  cohort: { type: String, required: true, trim: true }, // Trim added
  standard: {type: String, required: true, trim: true},
  courses: { type: [String], required: true }, // No need for trim here as it's an array
  date_joined: { type: Date, default: Date.now },
  last_login: { type: Date, default: Date.now },
  status: { type: Boolean, default: false },
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
