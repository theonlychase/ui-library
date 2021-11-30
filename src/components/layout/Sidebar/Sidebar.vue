<script setup lang="ts">
  import { ref } from 'vue';
  import NavigationMenu from '@/components/layout/NavigationMenu';

  const sidebarOpen = ref(false);
  const sidebarTransition = ref(false);
</script>

<template>
  <div
    v-if="sidebarOpen"
    class="fixed inset-0 flex z-40 md:hidden"
    role="dialog"
    aria-modal="true"
  >
    <transition
      enter-active-class="transition-opacity ease-linear duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-linear duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      appear
      @click="sidebarTransition = false"
      @after-leave="sidebarOpen = false"
    >
      <div
        v-if="sidebarTransition"
        class="fixed inset-0 bg-gray-600 bg-opacity-75"
        aria-hidden="true"
      />
    </transition>

    <transition
      enter-active-class="transition-all ease-in-out duration-300"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-to-class="-translate-x-full"
      leave-from-class="translate-x-0"
      leave-active-class="transition-all ease-in-out duration-300"
      appear
    >
      <div
        v-if="sidebarTransition"
        class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white"
      >
        <transition
          enter-active-class="ease-in-out duration-300"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-to-class="opacity-0"
          leave-from-class="opacity-100"
          leave-active-class="ease-in-out duration-300"
        >
          <div class="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              @click="sidebarTransition = false"
            >
              <span class="sr-only">Close sidebar</span>

              <wc-icon name="closeOutline" size="small" stroke="white" />
            </button>
          </div>
        </transition>

        <navigation-menu />
      </div>
    </transition>

    <div class="flex-shrink-0 w-14" aria-hidden="true" />
  </div>

  <div
    class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-50 shadow"
  >
    <div class="flex flex-col flex-grow pt-5 bg-white overflow-y-auto">
      <navigation-menu />
    </div>
  </div>
  <div class="md:pl-64 flex flex-col">
    <div class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <button
        type="button"
        class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
        @click="
          () => {
            sidebarOpen = true;
            sidebarTransition = true;
          }
        "
      >
        <span class="sr-only">Open sidebar</span>

        <wc-icon
          name="menuAlt2"
          size="small"
          stroke="currentColor"
          aria-hidden="true"
        />
      </button>
      <div class="flex-1 px-4 flex justify-between">
        <div class="flex-1 flex"></div>
      </div>
    </div>
  </div>
</template>
