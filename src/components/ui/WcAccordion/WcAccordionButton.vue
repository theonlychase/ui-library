<script setup lang="ts">
  import { computed, inject, Ref } from 'vue';
  import { buttonClasses, injectItemData, setPanelOpen } from './composables';
  export interface ButtonProps {
    id?: number;
  }

  const props = withDefaults(defineProps<ButtonProps>(), {
    id: 0,
  });

  const { isOpen, single } = injectItemData(props.id);
  const size = inject('size') as Ref;
  const computedSizes = computed(() => {
    return buttonClasses[size.value];
  });
</script>

<template>
  <wc-button
    :id="`button-${id}`"
    :aria-expanded="isOpen"
    :aria-controls="`panel-${id}`"
    :title="`Accordion Button ${id}`"
    class="justify-between font-medium text-left !rounded-lg !text-gray-900 !bg-gray-100 hover:!bg-gray-200 focus:outline-none focus:ring-gray-500 mt-2 first:mt-0"
    :class="computedSizes.font"
    :size="size"
    truncate
    block
    @click="setPanelOpen(id, single)"
  >
    <slot />

    <template #icon-right>
      <wc-icon
        name="chevronUp"
        :size="computedSizes.icon"
        color="blue900"
        class="transition-all duration-200 ease-in-out"
        :class="isOpen && 'rotate-180'"
      />
    </template>
  </wc-button>
</template>
