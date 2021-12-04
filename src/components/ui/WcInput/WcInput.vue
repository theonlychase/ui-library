<script setup lang="ts">
  const props = defineProps({
    value: {
      type: String,
      default: '',
    },
  });

  const emit = defineEmits(['update:value']);
</script>

<template>
  <input
    :value="value"
    @input="({ target }) => $emit('update:value', target.value)"
  />
</template>
