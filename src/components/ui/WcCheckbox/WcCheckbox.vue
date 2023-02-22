<script setup lang="ts">
  import { InputValueProps } from '@/types/global';
  import { computed, ref, watch } from 'vue';
  import { getValueName } from '@/utils/helpers';

  interface CheckboxProps {
    option: InputValueProps;
    value?: Array<InputValueProps>;
  }

  const emit = defineEmits(['update:value']);
  const props = withDefaults(defineProps<CheckboxProps>(), {
    option: '',
    value: () => [],
  });

  const label = computed(() => getValueName(props.option));
  const selected = ref([]);

  watch(
    () => selected.value,
    (option) => {
      emit('update:value', [...option]);
    },
  );
</script>

<template>
  <div class="relative flex items-start">
    <div class="flex items-center h-5">
      <input
        :id="label"
        v-model="selected"
        :aria-describedby="label"
        :name="label"
        :value="option"
        type="checkbox"
        class="form-checkbox focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
      />
    </div>
    <div v-if="label" class="ml-3 text-sm">
      <label :for="label" class="font-medium text-gray-700">{{ label }}</label>
    </div>
  </div>
</template>
