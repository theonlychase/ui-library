<script setup lang="ts">
  import { ref } from 'vue';

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
