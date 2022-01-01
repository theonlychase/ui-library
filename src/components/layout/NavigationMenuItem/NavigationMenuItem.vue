<script setup lang="ts">
  import { inject, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();

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

  const closeSidebar = inject('closeSidebar');
  const isOpen = ref(false);

  watch(
    () => route.path,
    (val) => {
      if (val.includes(props.path)) {
        isOpen.value = true;
      }
    },
    { flush: 'post' },
  );
</script>

<template>
  <router-link :to="{ name }">
    <button
      type="button"
      :class="
        isOpen
          ? 'bg-gray-200 text-gray-900'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      "
      class="bg-gray-50 group w-full flex items-center px-2 py-2 text-left text-sm font-medium rounded-md focus:outline-none"
      :aria-controls="`sub-menu-${name}`"
      :aria-expanded="isOpen"
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
        aria-hidden="true"
      />
      {{ name }}
    </button>
  </router-link>

  <div v-if="isOpen" id="sub-menu-1" class="space-y-1">
    <router-link
      v-for="child in children"
      v-slot="{ isActive }"
      :key="child.name"
      :to="`${path}/${child.path}`"
    >
      <button
        type="button"
        :class="
          isActive
            ? 'bg-blue-400 text-white'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        "
        class="group w-full flex items-center pl-10 pr-2 py-2 text-sm font-medium rounded-md"
        @click="closeSidebar"
      >
        {{ child.meta.name }}
      </button>
    </router-link>
  </div>
</template>
