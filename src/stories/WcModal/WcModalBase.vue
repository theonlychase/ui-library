<script setup lang="ts">
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import controls from './controls.js';
  import { setDefaultControls } from '@/utils/helpers.js';

  const defaultProps = setDefaultControls(controls, useStore);
  const value = ref(false);
</script>

<template>
  <wc-modal v-model:value="value" v-bind="defaultProps">
    <template #activator>
      <wc-button>Button</wc-button>
    </template>

    <div>
      <div
        class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
      >
        <wc-icon name="questionMarkCircle" size="xLarge" color="green600" />
      </div>
      <div class="mt-3 text-center sm:mt-5">
        <h3
          id="modal-title"
          class="text-lg leading-6 font-medium text-gray-900"
        >
          Payment successful
        </h3>
        <div class="mt-2">
          <p class="text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            amet labore.
          </p>
        </div>
      </div>
    </div>
    <div class="mt-5 sm:mt-6">
      <button
        type="button"
        class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
      >
        Go back to dashboard
      </button>
    </div>
  </wc-modal>
</template>
