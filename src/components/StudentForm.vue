<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  editingStudent: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['save', 'cancel'])

const form = ref({
  id: null,
  studentId: '',
  fullName: '',
  courseSection: '',
  status: 'Active'
})

const errorMessage = ref('')

// Populate form when editing
watch(
  () => props.editingStudent,
  (newVal) => {
    if (newVal) {
      form.value = { 
        ...newVal, 
        status: newVal.status || 'Active' 
      }
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

function handleSubmit() {
  errorMessage.value = ''

  // 1. Check empty fields
  if (!form.value.studentId.trim() || !form.value.fullName.trim() || !form.value.courseSection.trim()) {
    errorMessage.value = 'Please fill out all fields.'
    return
  }

  // 2. Validate Student ID (Numbers only)
  const studentIdRegex = /^[0-9]+$/
  if (!studentIdRegex.test(form.value.studentId.trim())) {
    errorMessage.value = 'Student ID must contain numbers only.'
    return
  }

  // 3. Validate Full Name (Letters and spaces only)
  const nameRegex = /^[a-zA-Z\s]+$/
  if (!nameRegex.test(form.value.fullName.trim())) {
    errorMessage.value = 'Full Name must contain letters only.'
    return
  }

  // Emit data to App.vue
  emit('save', {
    studentId: form.value.studentId.trim(),
    fullName: form.value.fullName.trim(),
    courseSection: form.value.courseSection.trim(),
    status: form.value.status || 'Active'
  })

  resetForm()
}

function handleCancel() {
  resetForm()
  emit('cancel')
}

function resetForm() {
  form.value = {
    id: null,
    studentId: '',
    fullName: '',
    courseSection: '',
    status: 'Active'
  }
  errorMessage.value = ''
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-6">
    <h3 class="text-xl font-bold text-gray-800 mb-4">
      {{ form.id ? 'Edit Student Record' : 'Add New Student' }}
    </h3>

    <!-- Error Alert -->
    <div 
      v-if="errorMessage" 
      class="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 text-sm rounded-lg"
    >
      {{ errorMessage }}
    </div>

    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <!-- Student ID (Numbers only pattern) -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">
          Student ID
        </label>
        <input
          v-model="form.studentId"
          type="text"
          placeholder="e.g. 64172024"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <!-- Full Name (Letters only pattern) -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">
          Full Name
        </label>
        <input
          v-model="form.fullName"
          type="text"
          placeholder="e.g. Juan Dela Cruz"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <!-- Course / Section -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">
          Course / Section
        </label>
        <input
          v-model="form.courseSection"
          type="text"
          placeholder="e.g. BSCS-3B"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <!-- Status Selection -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">
          Status
        </label>
        <select
          v-model="form.status"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <!-- Form Buttons -->
      <div class="md:col-span-2 lg:col-span-4 flex justify-end gap-3 mt-2">
        <button
          v-if="form.id"
          type="button"
          @click="handleCancel"
          class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>

        <button
          type="submit"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          {{ form.id ? 'Update Student' : 'Add Student' }}
        </button>
      </div>

    </form>
  </div>
</template>