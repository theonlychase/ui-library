<script setup lang="ts">
  import { ref } from 'vue';

  const props = defineProps({
    children: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      default: '',
    },
    path: {
      type: String,
      default: '',
    },
  });

  const isOpen = ref(false);
</script>

<template>
  <router-link :to="path">
    <button
      type="button"
      :class="
        isOpen
          ? 'bg-gray-100 text-gray-900'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      "
      class="bg-white group w-full flex items-center pr-2 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      :aria-controls="`sub-menu-${name}`"
      aria-expanded="false"
      @click="children.length ? (isOpen = !isOpen) : null"
    >
      <wc-icon
        class="text-gray-300 mr-2 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150"
        :class="
          isOpen && children.length
            ? 'text-gray-400 rotate-90'
            : 'text-gray-300'
        "
        name="chevronRight"
        size="xSmall"
        viewBox="0 0 20 20"
        aria-hidden="true"
      />
      {{ name }}
    </button>
  </router-link>

  <div v-if="isOpen" id="sub-menu-1" class="space-y-1">
    <router-link
      v-for="child in children"
      v-slot="{ isActive, route }"
      :key="child.name"
      :to="{ name: child.name, query: { ...$route.query } }"
    >
      <button
        type="button"
        :class="
          isActive
            ? 'bg-blue-400 text-white'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        "
        class="group w-full flex items-center pl-10 pr-2 py-2 text-sm font-medium rounded-md"
      >
        {{ child.name }}
      </button>
    </router-link>
  </div>
</template>
