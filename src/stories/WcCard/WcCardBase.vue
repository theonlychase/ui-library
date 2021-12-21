<script setup lang="ts">
  import { useStore } from 'vuex';
  import controls from './controls';
  import { setDefaultControls } from '@/utils/helpers.js';

  const defaultProps = setDefaultControls(controls, useStore);
</script>

<template>
  <wc-card v-bind="defaultProps">
    <template v-if="$route.query.headerSlot === 'true'" #header>
      <div class="flex items-center justify-between">
        <div>Card Header</div>
        <wc-button size="small">Card Button</wc-button>
      </div>
    </template>

    <template v-if="$route.query.mediaSlot === 'true'" #media>
      <img
        src="https://images.unsplash.com/photo-1511225070737-5af5ac9a690d"
        :class="{
          'aspect-16/9': $route.query.horizontal === 'false',
        }"
      />
    </template>

    main content main content main content main content

    <template v-if="$route.query.footerSlot === 'true'" #footer>
      Footer Slot
    </template>
  </wc-card>
</template>
