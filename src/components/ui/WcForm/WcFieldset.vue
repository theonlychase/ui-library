<script setup lang="ts">
  import { InputValueProps } from '@/types/global';
  import { computed } from 'vue';
  import { filterDuplicates } from '@/utils/helpers';

  interface FieldsetProps {
    legend?: string;
    options?: Array<InputValueProps>;
  }

  const props = withDefaults(defineProps<FieldsetProps>(), {
    legend: 'Fieldset Context',
    options: () => [],
  });

  const allOptions = computed(() => {
    return props.options.length ? filterDuplicates(props.options) : [];
  });
</script>

<template>
  <fieldset>
    <legend class="sr-only">{{ legend }}</legend>

    <template v-if="options.length">
      <slot v-for="option in allOptions" :option="option" />
    </template>

    <slot v-else />
  </fieldset>
</template>
