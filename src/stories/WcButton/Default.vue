<script setup lang="ts">
  import controls from './controls.js';
  import { setDefaultControls } from '@/utils/stories';
  import WcIcon from '@/components/ui/WcIcon/WcIcon.vue';

  const defaultProps = setDefaultControls({
    controls,
    title: 'Default Button',
  });
</script>

<template>
  <wc-button v-bind="defaultProps">
    <template v-if="$route.query.iconLeft" #icon-left>
      <wc-icon
        name="plus"
        :class="
          $route.query.variation === 'white' ||
          $route.query.variation === 'text'
            ? 'text-gray-700'
            : 'text-white'
        "
        size="xSmall"
      />
    </template>
    <wc-icon
      v-if="$route.query.circle"
      name="plus"
      :class="
        $route.query.variation === 'white' || $route.query.variation === 'text'
          ? 'text-gray-700'
          : 'text-white'
      "
      size="xSmall"
    />
    <div v-else>Button</div>
    <template v-if="$route.query.iconRight" #icon-right>
      <wc-icon
        name="chevronRight"
        :class="
          $route.query.variation === 'white' ||
          $route.query.variation === 'text'
            ? 'text-gray-700'
            : 'text-white'
        "
        size="xSmall"
      />
    </template>
  </wc-button>
</template>
