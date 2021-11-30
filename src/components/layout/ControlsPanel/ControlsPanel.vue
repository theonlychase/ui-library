<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  const router = useRouter();
  const route = useRoute();

  let selected = ref('medium');

  const updateQuery = ({ target }) => {
    selected.value = target.value;

    router.push({
      name: route.name,
      query: {
        size: selected.value,
      },
    });
  };
</script>

<template>
  <div class="min-h-[500px] bg-white mt-auto shadow">
    <div>
      <label for="location" class="block text-sm font-medium text-gray-700"
        >Location</label
      >
      {{ selected }}
      <select
        id="location"
        name="location"
        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        @input="updateQuery"
      >
        <option>small</option>
        <option selected>medium</option>
        <option>large</option>
      </select>
    </div>
  </div>
</template>
