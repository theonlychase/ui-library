<script setup lang="ts">
  import { useStore } from 'vuex';
  import controls from './controls.js';
  import { setDefaultControls } from '@/utils/stories';
  import WcIcon from '@/components/ui/WcIcon/WcIcon.vue';

  const defaultProps = setDefaultControls(controls, useStore);
</script>

<template>
  <wc-button v-bind="defaultProps">
    <template v-if="$route.query.iconLeft === 'true'" #icon-left>
      <wc-icon name="plus" color="gray400" size="xSmall" />
    </template>
    <wc-icon
      v-if="$route.query.circle === 'true'"
      name="plus"
      :color="$route.query.variation !== 'primary' ? 'gray700' : 'white'"
      size="xSmall"
    />
    <div v-else>Button</div>
    <template v-if="$route.query.iconRight === 'true'" #icon-right>
      <wc-icon name="chevronRight" color="gray400" size="xSmall" />
    </template>
  </wc-button>
</template>
