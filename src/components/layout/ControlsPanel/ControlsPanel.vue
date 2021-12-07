<script setup lang="ts">
  import { useRouter, useRoute } from 'vue-router';
  import { useStore } from 'vuex';
  import { ref } from 'vue';
  import {
    panelHeaders,
    resizePanel,
    setControls,
    setComponents,
    tabs,
    updateQuery,
  } from './composables.js';

  const router = useRouter();
  const route = useRoute();
  const store = useStore();

  const panel = ref(null);
  const activeTab = ref('controls');
  const { height } = resizePanel(panel);
  const controlsState = setControls(route, store);
</script>

<template>
  <div
    ref="panel"
    class="w-full min-h-[200px] bg-white mt-auto shadow relative bg-gray-50 border border-solid border-gray-200"
    :style="{ height: `${height}${height !== 'auto' ? 'px' : ''}` }"
  >
    <div class="absolute top-0 left-0 h-1 w-full cursor-move z-10" />
    <wc-tabs v-model:active="activeTab" :tabs="tabs" overflow-content>
      <template #[activeTab]="{ tab }">
        <table
          v-if="tab === 'controls'"
          class="min-w-full divide-y divide-gray-200"
        >
          <thead class="bg-gray-100">
            <tr>
              <th
                v-for="header in panelHeaders"
                :key="header"
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-gray-50 divide-y divide-gray-200">
            <tr v-for="control in controlsState" :key="control.name">
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                {{ control.name }}
                <div class="text-gray-400 text-xs">
                  {{ control.props.disabled ? 'disabled' : '' }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ control.description }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <component
                  :is="setComponents(control.type)"
                  :key="control.name"
                  v-bind="control.props"
                  @update:value="
                    (val) =>
                      updateQuery(
                        { val, name: control.name },
                        store,
                        route,
                        router,
                        controlsState,
                      )
                  "
                />
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </wc-tabs>
  </div>
</template>
