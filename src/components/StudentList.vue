<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  students: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['edit', 'delete', 'toggle-status'])

// Filter state
const selectedStatus = ref('all')

// Filter logic (Defaults missing status to 'active')
const filteredStudents = computed(() => {
  return props.students.filter((student) => {
    if (selectedStatus.value === 'all') return true

    const studentStatus = (student.status || 'active').toLowerCase()
    return studentStatus === selectedStatus.value.toLowerCase()
  })
})
</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-6">

    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
      <h2 class="text-2xl font-bold text-gray-800">
        Student Records
      </h2>

      <div class="flex items-center gap-3">
        <!-- Status Filter Buttons -->
        <div class="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            @click="selectedStatus = 'all'"
            :class="[
              'px-3 py-1.5 text-xs sm:text-sm font-medium border rounded-l-lg transition-colors',
              selectedStatus === 'all'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            ]"
          >
            All
          </button>
          <button
            type="button"
            @click="selectedStatus = 'active'"
            :class="[
              'px-3 py-1.5 text-xs sm:text-sm font-medium border-t border-b transition-colors',
              selectedStatus === 'active'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            ]"
          >
            Active
          </button>
          <button
            type="button"
            @click="selectedStatus = 'inactive'"
            :class="[
              'px-3 py-1.5 text-xs sm:text-sm font-medium border rounded-r-lg transition-colors',
              selectedStatus === 'inactive'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            ]"
          >
            Inactive
          </button>
        </div>

        <span class="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
          {{ filteredStudents.length }} Students
        </span>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="filteredStudents.length === 0"
      class="text-center py-10 text-gray-500"
    >
      <p class="text-lg">No student records found.</p>
      <p class="text-sm mt-1">
        Add a student using the form above or adjust your status filter.
      </p>
    </div>

    <!-- Student Table -->
    <div v-else class="overflow-x-auto">

      <table class="w-full border-collapse">

        <thead>
          <tr class="bg-gray-100">
            <th class="text-left px-4 py-3 border-b">
              Student ID
            </th>

            <th class="text-left px-4 py-3 border-b">
              Full Name
            </th>

            <th class="text-left px-4 py-3 border-b">
              Course / Section
            </th>

            <th class="text-center px-4 py-3 border-b">
              Status
            </th>

            <th class="text-center px-4 py-3 border-b">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>

          <tr
            v-for="student in filteredStudents"
            :key="student.id"
            class="hover:bg-gray-50"
          >

            <td class="px-4 py-3 border-b">
              {{ student.studentId }}
            </td>

            <td class="px-4 py-3 border-b font-medium">
              {{ student.fullName }}
            </td>

            <td class="px-4 py-3 border-b">
              {{ student.courseSection }}
            </td>

            <td class="px-4 py-3 border-b text-center">
              <span
                :class="[
                  'px-2.5 py-1 rounded-full text-xs font-semibold',
                  student.status && student.status.toLowerCase() === 'inactive'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-green-100 text-green-700'
                ]"
              >
                {{ student.status || 'Active' }}
              </span>
            </td>

            <td class="px-4 py-3 border-b">
              <div class="flex justify-center gap-2">

                <!-- Toggle Status Button -->
                <button
                  @click="emit('toggle-status', student)"
                  :class="[
                    'px-3 py-1 rounded-lg text-white font-medium text-xs sm:text-sm transition-colors',
                    student.status && student.status.toLowerCase() === 'inactive'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-gray-600 hover:bg-gray-700'
                  ]"
                >
                  Set {{ student.status && student.status.toLowerCase() === 'inactive' ? 'Active' : 'Inactive' }}
                </button>

                <button
                  @click="emit('edit', student)"
                  class="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  @click="emit('delete', student.id)"
                  class="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>

              </div>
            </td>

          </tr>

        </tbody>

      </table>

    </div>

  </div>
</template>