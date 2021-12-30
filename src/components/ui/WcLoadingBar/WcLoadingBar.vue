<script setup lang="ts">
  interface LoadingProps {
    loading?: boolean;
  }

  const emit = defineEmits(['update:loading']);
  const props = withDefaults(defineProps<LoadingProps>(), {
    loading: false,
  });
</script>

<template>
  <div
    :class="loading ? 'bg-blue-500' : 'bg-transparent'"
    class="overflow-hidden w-full h-0.5 mx-0.5 bottom-1 top-full left-0"
  >
    <div
      v-if="loading"
      class="relative w-full h-full before:animate-loading-before after:animate-loading-after before:content-[''] before:h-full before:absolute before:bg-gray-50 after:h-full after:absolute after:bg-gray-50 after:content-['']"
    />
  </div>
</template>
