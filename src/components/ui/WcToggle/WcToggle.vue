<script setup lang="ts">
  const props = defineProps({
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(['update:value']);
</script>

<template>
  <label
    class="flex items-center"
    :class="disabled ? 'opacity-60' : 'cursor-pointer'"
  >
    <span class="relative flex">
      <input
        :disabled="disabled"
        type="checkbox"
        class="peer sr-only"
        :class="{
          'pointer-events-none': disabled,
        }"
        :value="value"
        @change="({ target }) => $emit('update:value', target.checked)"
      />
      <span class="block bg-gray-300 w-14 h-8 rounded-full" />
      <span
        class="toggle absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition peer-checked:translate-x-full peer-checked:bg-blue-500"
      />
    </span>
    <span class="ml-3 text-black700 font-medium">
      <slot />
    </span>
  </label>
</template>
