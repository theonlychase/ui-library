<script setup lang="ts">
  import WcAccordion from '@/components/ui/WcAccordion/WcAccordion.vue';
  import WcAccordionItem from '@/components/ui/WcAccordion/WcAccordionItem.vue';
  import { accordionControls } from './controls.js';
  import { setDefaultControls } from '@/utils/stories';

  const defaultProps = setDefaultControls({
    controls: accordionControls,
    title: 'Default Accordion',
  });
</script>

<template>
  <wc-accordion v-bind="defaultProps">
    <wc-accordion-item>
      Accordion Item
      <template #panel> Accordion Item Panel Content </template>
    </wc-accordion-item>

    <wc-accordion-item>
      Accordion Item
      <template #panel> Accordion Item Panel Content </template>
    </wc-accordion-item>

    <wc-accordion-item>
      Accordion Item
      <template #panel> Accordion Item Panel Content </template>
    </wc-accordion-item>

    <wc-accordion-item>
      Accordion Item
      <template #panel> Accordion Item Panel Content </template>
    </wc-accordion-item>
  </wc-accordion>
</template>
