<script setup lang="ts">
  import { ButtonSizes } from '@/components/ui/WcButton/WcButton.vue';
  interface AccordionProps {
    single?: boolean;
    size?: ButtonSizes;
  }
  const emit = defineEmits(['update:value']);
  const props = withDefaults(defineProps<AccordionProps>(), {
    single: false,
    size: 'medium',
  });

  import { api } from './composables';
  api(props, emit);
</script>

<template>
  <div class="w-full p-2 mx-auto rounded-2xl">
    <slot />
  </div>
</template>
