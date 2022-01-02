<script setup lang="ts">
  import WcAccordion from '@/components/ui/WcAccordion/WcAccordion.vue';
  import WcAccordionItem from '@/components/ui/WcAccordion/WcAccordionItem.vue';
  import { itemControls } from './controls.js';
  import { setDefaultControls } from '@/utils/stories';

  const defaultProps = setDefaultControls({
    controls: itemControls,
    title: 'Default Accordion Item',
  });
</script>

<template>
  <wc-accordion>
    <wc-accordion-item open>
      Accordion Item Opened By Default
      <template #panel> Accordion Item Panel Content </template>
    </wc-accordion-item>

    <wc-accordion-item open>
      Accordion Item Opened By Default
      <template #panel> Accordion Item Panel Content </template>
    </wc-accordion-item>

    <wc-accordion-item open>
      Accordion Item Opened By Default
      <template #panel> Accordion Item Panel Content </template>
    </wc-accordion-item>

    <wc-accordion-item>
      Accordion Item
      <template #panel> Accordion Item Panel Content </template>
    </wc-accordion-item>
  </wc-accordion>
</template>
