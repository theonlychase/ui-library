<script setup lang="ts">
  const props = defineProps({
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: '',
    },
  });

  const emit = defineEmits(['update:value']);
</script>

<template>
  <select
    :value="value"
    @input="({ target }) => $emit('update:value', target.value)"
  >
    <template v-if="options.length">
      <option v-for="option in options" :key="option">{{ option }}</option>
    </template>
  </select>
</template>
