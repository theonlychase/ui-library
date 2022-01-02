<script setup lang="ts">
  import WcAccordionButton from './WcAccordionButton.vue';
  import WcAccordionPanel from './WcAccordionPanel.vue';
  import { getCurrentInstance, watch } from 'vue';
  import { injectItemData, setPanelOpen } from './composables';

  const props = withDefaults(defineProps<{ open?: boolean }>(), {
    open: false,
  });

  const id = getCurrentInstance()?.uid;
  const { single } = injectItemData(id);

  watch(
    () => props.open,
    (val) => {
      val && setPanelOpen(id, single.value);
    },
    { immediate: true },
  );
</script>

<template>
  <wc-accordion-button :id="id">
    <slot />
  </wc-accordion-button>

  <wc-accordion-panel :id="id">
    <slot name="panel" />
  </wc-accordion-panel>
</template>
