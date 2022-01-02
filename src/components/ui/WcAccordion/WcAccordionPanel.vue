<script setup lang="ts">
  import { injectItemData } from './composables';

  const props = withDefaults(defineProps<{ id: number }>(), {
    id: 0,
  });

  const { isOpen } = injectItemData(props.id);
</script>

<template>
  <transition
    enter-active-class="transition duration-100 ease-in-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-75 ease-in-out"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
  >
    <div
      v-if="isOpen"
      :id="`panel-${id}`"
      class="px-4 py-4 pb-2 text-sm text-gray-500"
    >
      <slot />
    </div>
  </transition>
</template>
