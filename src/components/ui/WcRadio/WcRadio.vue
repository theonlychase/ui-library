<script setup lang="ts">
  import { InputValueProps } from '@/types/global';
  import { api } from './composables';

  interface CheckboxProps {
    option: InputValueProps;
    value?: InputValueProps;
  }

  const emit = defineEmits(['update:value']);
  const props = withDefaults(defineProps<CheckboxProps>(), {
    option: '',
    value: '',
  });

  const { isChecked, label, selected } = api(emit, props);
</script>

<template>
  <div class="flex items-center">
    <input
      :id="label"
      v-model="selected"
      :aria-describedby="label"
      :name="label"
      :value="option"
      :checked="isChecked"
      type="radio"
      class="form-radio focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
    />
    <div v-if="label" class="ml-3 text-sm">
      <label :for="label" class="font-medium text-gray-700">{{ label }}</label>
    </div>
  </div>
</template>
