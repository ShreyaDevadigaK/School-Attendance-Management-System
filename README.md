# Student Attendance Management System

## Overview
The **Student Attendance Management System** is a lightweight, responsive web application for teachers to manage student registries and track daily attendance. It provides an intuitive interface for marking attendance, searching records, and viewing quick statistics.

## Key Features
- **Teacher Authentication**: Secure portal access with login credentials.
- **Student CRUD Operations**: Add, Edit, and Delete student records (Name, Phone, City, Roll No).
- **Persistent Attendance Tracking**: Mark students as Present (P) or Absent (A) with data saved to local storage.
- **Real-time Statistics**: View total students, present, and absent counts instantly.
- **Search Functionality**: Quickly filter students by Name or Roll Number.
- **Persistent Storage**: Uses browser `localStorage` to keep data safe across sessions.

## Technologies Used
- **HTML5**: Semantic structure and layout.
- **CSS3**: Responsive design with a clean, professional theme.
- **JavaScript (ES6)**: Core logic for data handling, DOM manipulation, and search.
- **Bootstrap 5**: Component styling and responsive utilities.

## Usage
1. **Open the Application**: Open `index.html` in any modern web browser.
2. **Login**: 
   - **Username**: `shreya`
   - **Password**: `shreya`
3. **Manage Students**:
   - Fill out the form in the "Student Data" section to add a new student.
   - Use the **✎ (Edit)** button in the table to update existing student details.
   - Use the **🗑 (Delete)** button to remove a student.
4. **Mark Attendance**:
   - Click **P** (Present) or **A** (Absent) in the table row for each student.
   - Selected attendance statuses are automatically saved and will persist after page refreshes.
5. **Analyze & Search**:
   - Check the **Stats Summary** at the top for a quick overview.
   - Use the **Search bar** above the table to find students quickly.
6. **Logout**: Click the **Logout** button at the top right to return to the login screen.
