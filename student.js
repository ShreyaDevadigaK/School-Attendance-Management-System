// Initialize data from localStorage or an empty array
let studentDataArr = JSON.parse(localStorage.getItem("studentData")) || [];

// Event Listeners
document.getElementById("form1").addEventListener("submit", submitForm);
document.getElementById("search").addEventListener("input", searchStudent);

/**
 * Handle form submission for adding or updating a student
 */
function submitForm(e) {
    e.preventDefault();
    
    const name = document.querySelector("#name").value;
    const number = document.querySelector("#number").value;
    const city = document.querySelector("#city").value;
    const rollNo = document.querySelector("#rollNo").value;
    const editId = document.querySelector("#form1").getAttribute("data-edit-id");

    if (editId) {
        // Update existing student
        const index = studentDataArr.findIndex(s => s.id == editId);
        if (index !== -1) {
            studentDataArr[index] = { 
                ...studentDataArr[index], 
                name, number, city, rollNo 
            };
            alert("Student updated successfully!");
        }
        document.querySelector("#form1").removeAttribute("data-edit-id");
        document.querySelector("#add-btn").textContent = "Add Student";
    } else {
        // Add new student
        const studentObj = {
            id: Date.now(), // Unique ID
            name,
            number,
            city,
            rollNo,
            attendance: null // null | 'Present' | 'Absent'
        };
        studentDataArr.push(studentObj);
        alert("Student added successfully!");
    }

    saveAndRefresh();
    document.querySelector("#form1").reset();
}

/**
 * Save data to localStorage and refresh the UI
 */
function saveAndRefresh() {
    localStorage.setItem("studentData", JSON.stringify(studentDataArr));
    displayFun(studentDataArr);
    updateStats();
}

/**
 * Update the Top Statistics Summary
 */
function updateStats() {
    const total = studentDataArr.length;
    const present = studentDataArr.filter(s => s.attendance === 'Present').length;
    const absent = studentDataArr.filter(s => s.attendance === 'Absent').length;

    document.getElementById("total-count").textContent = total;
    document.getElementById("present-count").textContent = present;
    document.getElementById("absent-count").textContent = absent;
}

/**
 * Render the student table
 */
function displayFun(data) {
    const tbody = document.querySelector("#tbody");
    tbody.innerHTML = "";

    data.forEach((item, index) => {
        const tr = document.createElement("tr");
        tr.style.animation = `fadeIn 0.3s ease-out ${index * 0.05}s forwards`;
        tr.style.opacity = "0";

        // # Count
        const td1 = document.createElement("td");
        td1.textContent = index + 1;

        // Name
        const td2 = document.createElement("td");
        td2.textContent = item.name;

        // Roll No
        const td3 = document.createElement("td");
        td3.textContent = item.rollNo;

        // City
        const td4 = document.createElement("td");
        td4.textContent = item.city;

        // Attendance Actions
        const td5 = document.createElement("td");
        const attContainer = document.createElement("div");
        attContainer.className = "attendance-btns";

        const btnP = document.createElement("button");
        btnP.className = `btn-action btn-present ${item.attendance === 'Present' ? 'active' : ''}`;
        btnP.textContent = "P";
        btnP.onclick = () => markAttendance(item.id, 'Present');

        const btnA = document.createElement("button");
        btnA.className = `btn-action btn-absent ${item.attendance === 'Absent' ? 'active' : ''}`;
        btnA.textContent = "A";
        btnA.onclick = () => markAttendance(item.id, 'Absent');

        attContainer.append(btnP, btnA);
        td5.append(attContainer);

        // Actions (Edit/Delete)
        const td6 = document.createElement("td");
        td6.style.textAlign = "center";
        
        const btnEdit = document.createElement("button");
        btnEdit.className = "btn-action btn-edit";
        btnEdit.innerHTML = "✎";
        btnEdit.title = "Edit Student";
        btnEdit.onclick = () => editStudent(item.id);

        const btnDelete = document.createElement("button");
        btnDelete.className = "btn-action btn-delete";
        btnDelete.innerHTML = "🗑";
        btnDelete.title = "Delete Student";
        btnDelete.onclick = () => deleteStudent(item.id);

        td6.append(btnEdit, btnDelete);

        tr.append(td1, td2, td3, td4, td5, td6);
        tbody.append(tr);
    });
}

/**
 * Mark a student's attendance
 */
function markAttendance(id, status) {
    const index = studentDataArr.findIndex(s => s.id === id);
    if (index !== -1) {
        // Toggle if already selected, or just set
        studentDataArr[index].attendance = (studentDataArr[index].attendance === status) ? null : status;
        saveAndRefresh();
    }
}

/**
 * Delete a student from the list
 */
function deleteStudent(id) {
    if (confirm("Are you sure you want to remove this student?")) {
        studentDataArr = studentDataArr.filter(s => s.id !== id);
        saveAndRefresh();
    }
}

/**
 * Load student data into form for editing
 */
function editStudent(id) {
    const student = studentDataArr.find(s => s.id === id);
    if (student) {
        document.querySelector("#name").value = student.name;
        document.querySelector("#number").value = student.number;
        document.querySelector("#city").value = student.city;
        document.querySelector("#rollNo").value = student.rollNo;
        
        // Set edit state on form
        const form = document.querySelector("#form1");
        form.setAttribute("data-edit-id", id);
        document.querySelector("#add-btn").textContent = "Update Student";
        
        // Scroll to form
        form.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Real-time search filtering
 */
function searchStudent() {
    const query = document.getElementById("search").value.toLowerCase();
    const filteredData = studentDataArr.filter(s => 
        s.name.toLowerCase().includes(query) || 
        s.rollNo.toString().includes(query)
    );
    displayFun(filteredData);
}

// Initial Render
saveAndRefresh();