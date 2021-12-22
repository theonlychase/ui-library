<script setup lang="ts">
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import controls from './controls.js';
  import { setDefaultControls } from '@/utils/stories';

  const defaultProps = setDefaultControls(controls, useStore);
  const value = ref(false);
</script>

<template>
  <wc-modal v-model:value="value" v-bind="defaultProps">
    <template #activator>
      <wc-button>Button</wc-button>
    </template>

    <div class="sm:flex sm:items-start">
      <div
        class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
      >
        <wc-icon name="exclamationSolid" color="red600" />
      </div>
      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <h3
          id="modal-title"
          class="text-lg leading-6 font-medium text-gray-900"
        >
          Deactivate account
        </h3>
        <div class="mt-2">
          <p class="text-sm text-gray-500">
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
          </p>
        </div>
      </div>
    </div>
    <div class="mt-5 sm:mt-4 sm:ml-10 sm:pl-4 sm:flex">
      <button
        type="button"
        class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
      >
        Deactivate
      </button>
      <button
        type="button"
        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
      >
        Cancel
      </button>
    </div>
  </wc-modal>
</template>
