<script setup lang="ts">
  import controls from './controls';
  import { setDefaultControls } from '@/utils/stories';

  const defaultProps = setDefaultControls({ controls, title: 'Default Card' });
</script>

<template>
  <wc-card v-bind="defaultProps">
    <template v-if="$route.query.headerSlot" #header>
      <div class="flex items-center justify-between">
        <div>Header Slot</div>
        <wc-button size="xSmall">Button</wc-button>
      </div>
    </template>

    <template v-if="$route.query.mediaSlot" #media>
      <img
        src="https://images.unsplash.com/photo-1511225070737-5af5ac9a690d"
        class="aspect-16/9"
      />
    </template>

    <div>Card Content</div>
    <div class="text-sm text-gray-400">More Content...</div>

    <template v-if="$route.query.footerSlot" #footer> Footer Slot </template>
  </wc-card>
</template>
