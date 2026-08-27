<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  editingStudent: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['save', 'cancel'])

const studentId = ref('')
const fullName = ref('')
const courseSection = ref('')
const errorMessage = ref('')

/*
  Watch for changes when editing a student.
  If a student is selected, put their information
  into the form.
*/
watch(
  () => props.editingStudent,
  (student) => {
    if (student) {
      studentId.value = student.studentId || ''
      fullName.value = student.fullName || ''
      courseSection.value = student.courseSection || ''
      errorMessage.value = ''
    } else {
      clearForm()
    }
  },
  {
    immediate: true
  }
)

/*
  Submit the form.
  This function is used for both:
  - Adding a new student
  - Updating an existing student
*/
function submitForm() {
  errorMessage.value = ''

  const id = studentId.value.trim()
  const name = fullName.value.trim()
  const course = courseSection.value.trim()

  // Check if fields are empty
  if (!id || !name || !course) {
    errorMessage.value =
      'Please complete all required fields before submitting.'

    return
  }

  // Student ID validation
  if (id.length < 3) {
    errorMessage.value =
      'Student ID must contain at least 3 characters.'

    return
  }

  // Full name validation
  if (name.length < 2) {
    errorMessage.value =
      'Please enter a valid full name.'

    return
  }

  // Send student information to App.vue
  emit('save', {
    id: props.editingStudent?.id || null,
    studentId: id,
    fullName: name,
    courseSection: course
  })

  // Clear the form after saving
  clearForm()
}

/*
  Clear all form fields.
*/
function clearForm() {
  studentId.value = ''
  fullName.value = ''
  courseSection.value = ''
  errorMessage.value = ''
}

/*
  Cancel editing.
*/
function cancelEdit() {
  clearForm()
  emit('cancel')
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-6">

    <!-- Form Title -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-800">
        {{ editingStudent ? 'Edit Student' : 'Add Student' }}
      </h2>

      <p class="text-gray-500 text-sm mt-1">
        {{
          editingStudent
            ? 'Update the student information below.'
            : 'Enter the student information below.'
        }}
      </p>
    </div>

    <!-- Error Message -->
    <div
      v-if="errorMessage"
      class="mb-5 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg"
    >
      <strong>Error:</strong>
      {{ errorMessage }}
    </div>

    <!-- Student Form -->
    <form
      @submit.prevent="submitForm"
      class="space-y-5"
    >

      <!-- Student ID -->
      <div>
        <label
          for="studentId"
          class="block text-sm font-semibold text-gray-700 mb-2"
        >
          Student ID
          <span class="text-red-500">*</span>
        </label>

        <input
          id="studentId"
          v-model="studentId"
          type="text"
          required
          placeholder="Example: 2026-001"
          class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        <p class="text-xs text-gray-500 mt-1">
          Enter the student's identification number.
        </p>
      </div>

      <!-- Full Name -->
      <div>
        <label
          for="fullName"
          class="block text-sm font-semibold text-gray-700 mb-2"
        >
          Full Name
          <span class="text-red-500">*</span>
        </label>

        <input
          id="fullName"
          v-model="fullName"
          type="text"
          required
          placeholder="Example: Juan Dela Cruz"
          class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        <p class="text-xs text-gray-500 mt-1">
          Enter the student's complete name.
        </p>
      </div>

      <!-- Course / Section -->
      <div>
        <label
          for="courseSection"
          class="block text-sm font-semibold text-gray-700 mb-2"
        >
          Course / Section
          <span class="text-red-500">*</span>
        </label>

        <input
          id="courseSection"
          v-model="courseSection"
          type="text"
          required
          placeholder="Example: BSCS 3A"
          class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        <p class="text-xs text-gray-500 mt-1">
          Enter the student's course and section.
        </p>
      </div>

      <!-- Buttons -->
      <div
        class="flex flex-col sm:flex-row gap-3 pt-2"
      >

        <!-- Add / Update Button -->
        <button
          type="submit"
          class="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {{ editingStudent ? 'Update Student' : 'Add Student' }}
        </button>

        <!-- Clear Button -->
        <button
          v-if="!editingStudent"
          type="button"
          @click="clearForm"
          class="bg-gray-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-600 transition"
        >
          Clear Form
        </button>

        <!-- Cancel Button -->
        <button
          v-if="editingStudent"
          type="button"
          @click="cancelEdit"
          class="bg-gray-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-600 transition"
        >
          Cancel
        </button>

      </div>

      <!-- Required Fields Note -->
      <p class="text-xs text-gray-500">
        <span class="text-red-500">*</span>
        Required fields
      </p>

    </form>

  </div>
</template>