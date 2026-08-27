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

watch(
  () => props.editingStudent,
  (student) => {
    if (student) {
      studentId.value = student.studentId
      fullName.value = student.fullName
      courseSection.value = student.courseSection
    } else {
      clearForm()
    }
  },
  { immediate: true }
)

function submitForm() {
  errorMessage.value = ''

  if (
    !studentId.value.trim() ||
    !fullName.value.trim() ||
    !courseSection.value.trim()
  ) {
    errorMessage.value = 'Please complete all required fields.'
    return
  }

  emit('save', {
    id: props.editingStudent?.id,
    studentId: studentId.value.trim(),
    fullName: fullName.value.trim(),
    courseSection: courseSection.value.trim()
  })

  clearForm()
}

function clearForm() {
  studentId.value = ''
  fullName.value = ''
  courseSection.value = ''
  errorMessage.value = ''
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-5">
      {{ editingStudent ? 'Edit Student' : 'Add Student' }}
    </h2>

    <form @submit.prevent="submitForm" class="space-y-4">

      <!-- Student ID -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">
          Student ID
        </label>

        <input
          v-model="studentId"
          type="text"
          placeholder="Enter student ID"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Full Name -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">
          Full Name
        </label>

        <input
          v-model="fullName"
          type="text"
          placeholder="Enter full name"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Course / Section -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">
          Course / Section
        </label>

        <input
          v-model="courseSection"
          type="text"
          placeholder="Example: BSCS 3A"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Error -->
      <div
        v-if="errorMessage"
        class="bg-red-100 text-red-700 px-4 py-3 rounded-lg"
      >
        {{ errorMessage }}
      </div>

      <!-- Buttons -->
      <div class="flex gap-3">

        <button
          type="submit"
          class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          {{ editingStudent ? 'Update Student' : 'Add Student' }}
        </button>

        <button
          v-if="editingStudent"
          type="button"
          @click="emit('cancel')"
          class="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600"
        >
          Cancel
        </button>

      </div>

    </form>
  </div>
</template>