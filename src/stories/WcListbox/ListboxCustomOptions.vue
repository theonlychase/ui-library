<script setup lang="ts">
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import controls from './controls';
  import { setDefaultControls } from '@/utils/helpers.js';

  const value = ref('');

  const defaultProps = setDefaultControls(controls, useStore);
  const options = [
    'USA',
    { name: 'Mexico', id: 'mexico' },
    'Spain',
    'Brazil',
    'Germany',
    'Turkey',
    'Canada',
  ];
</script>

<template>
  <wc-listbox
    v-model:value="value"
    v-bind="defaultProps"
    :options="options"
    class="mb-6"
  >
    <template v-if="$route.query.iconLeft === 'true'" #icon-left>
      <wc-icon name="check" color="gray400" size="xSmall" />
    </template>

    <template v-if="$route.query.iconRight === 'true'" #icon-right>
      <wc-icon name="chevronDown" color="gray400" size="xSmall" />
    </template>

    <template #option="{ active, option }">
      <div class="flex items-center">
        <span class="mr-2">
          <wc-icon
            name="mail"
            :color="active ? 'white' : 'gray400'"
            size="xSmall"
          />
        </span>

        <span class="truncate flex-1">
          {{ option }}
        </span>

        <wc-icon
          v-if="active"
          name="check"
          :color="active ? 'white' : 'gray400'"
          size="xSmall"
        />
      </div>
    </template>
  </wc-listbox>
</template>
