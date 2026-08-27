<script setup>
defineProps({
  students: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-6">

    <div class="flex justify-between items-center mb-5">
      <h2 class="text-2xl font-bold text-gray-800">
        Student Records
      </h2>

      <span class="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
        {{ students.length }} Students
      </span>
    </div>

    <!-- Empty State -->
    <div
      v-if="students.length === 0"
      class="text-center py-10 text-gray-500"
    >
      <p class="text-lg">No student records found.</p>
      <p class="text-sm mt-1">
        Add a student using the form above.
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
              Actions
            </th>
          </tr>
        </thead>

        <tbody>

          <tr
            v-for="student in students"
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

            <td class="px-4 py-3 border-b">
              <div class="flex justify-center gap-2">

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