<script setup>
import { ref, computed, onMounted } from 'vue'

import StudentHeader from './components/StudentHeader.vue'
import StudentForm from './components/StudentForm.vue'
import StudentList from './components/StudentList.vue'
import StudentFooter from './components/StudentFooter.vue'

// Store all student records
const students = ref([])

// Search text
const searchTerm = ref('')

// Student currently being edited
const editingStudent = ref(null)

// Success message
const successMessage = ref('')

// Load students from localStorage when the app starts
onMounted(() => {
  const savedStudents = localStorage.getItem('module7-students')

  if (savedStudents) {
    students.value = JSON.parse(savedStudents)
  }
})

// Save students to localStorage
function saveStudents() {
  localStorage.setItem(
    'module7-students',
    JSON.stringify(students.value)
  )
}

// ADD / UPDATE STUDENT
function saveStudent(student) {
  // UPDATE
  if (editingStudent.value) {
    const index = students.value.findIndex(
      item => item.id === editingStudent.value.id
    )

    if (index !== -1) {
      students.value[index] = {
        ...students.value[index],
        ...student
      }
    }

    successMessage.value = 'Student successfully updated.'

    editingStudent.value = null
  }

  // ADD
  else {
    students.value.push({
      id: Date.now(),
      studentId: student.studentId,
      fullName: student.fullName,
      courseSection: student.courseSection
    })

    successMessage.value = 'Student successfully added.'
  }

  saveStudents()

  // Remove message after 3 seconds
  setTimeout(() => {
    successMessage.value = ''
  }, 3000)
}

// EDIT STUDENT
function editStudent(student) {
  editingStudent.value = { ...student }

  // Scroll to form
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// CANCEL EDIT
function cancelEdit() {
  editingStudent.value = null
}

// DELETE STUDENT
function deleteStudent(id) {
  const confirmed = window.confirm(
    'Are you sure you want to delete this student?'
  )

  if (!confirmed) {
    return
  }

  students.value = students.value.filter(
    student => student.id !== id
  )

  saveStudents()

  successMessage.value = 'Student successfully deleted.'

  setTimeout(() => {
    successMessage.value = ''
  }, 3000)
}

// SEARCH
const filteredStudents = computed(() => {
  const keyword = searchTerm.value
    .toLowerCase()
    .trim()

  if (!keyword) {
    return students.value
  }

  return students.value.filter(student =>
    student.studentId.toLowerCase().includes(keyword) ||
    student.fullName.toLowerCase().includes(keyword) ||
    student.courseSection.toLowerCase().includes(keyword)
  )
})
</script>

<template>

  <!-- HEADER -->
  <StudentHeader />

  <main class="min-h-screen bg-gray-100">

    <div class="max-w-6xl mx-auto px-4 py-8">

      <!-- INTRODUCTION -->
      <div class="mb-8">

        <h2 class="text-3xl font-bold text-gray-800">
          Student Management
        </h2>

        <p class="text-gray-600 mt-2">
          Add, view, edit, delete, and search student records.
        </p>

      </div>

      <!-- SUCCESS MESSAGE -->
      <div
        v-if="successMessage"
        class="mb-6 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg"
      >
        {{ successMessage }}
      </div>

      <!-- FORM -->
      <div class="mb-8">

        <StudentForm
          :editing-student="editingStudent"
          @save="saveStudent"
          @cancel="cancelEdit"
        />

      </div>

      <!-- SEARCH -->
      <div class="bg-white rounded-xl shadow-md p-6 mb-8">

        <label
          class="block text-sm font-semibold text-gray-700 mb-2"
        >
          Search Students
        </label>

        <input
        v-model="searchTerm"
        type="text"
        placeholder="Search Student ID, Name, or Course/Section"
        class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      <!-- STUDENT LIST -->
      <StudentList
        :students="filteredStudents"
        @edit="editStudent"
        @delete="deleteStudent"
      />

    </div>

  </main>

  <!-- FOOTER -->
  <StudentFooter />

</template>
