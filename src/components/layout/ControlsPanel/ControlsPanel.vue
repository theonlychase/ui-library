<script setup lang="ts">
  import { useRouter, useRoute } from 'vue-router';
  import { useStore } from 'vuex';
  import { computed, defineAsyncComponent, watch, ref } from 'vue';

  const router = useRouter();
  const route = useRoute();
  const store = useStore();

  const components = {
    WcSelect: defineAsyncComponent(
      () => import('@/components/ui/WcSelect/WcSelect.vue'),
    ),
    WcInput: defineAsyncComponent(
      () => import('@/components/ui/WcInput/WcInput.vue'),
    ),
  };

  const controlsState = computed(() => store.state.controls.controls);
  const tabs = [
    { id: 'controls', title: 'Controls' },
    { id: 'documentation', title: 'Documentation' },
  ];
  const activeTab = ref('controls');
  const tabContentSlot = computed(() => {
    return `tab-content-${activeTab.value}`;
  });

  watch(
    () => controlsState.value,
    (val) => {
      if (val) {
        Object.entries(route.query).forEach(([key, value]) => {
          controlsState.value[`${key}`].props.value = value;
        });
      }
    },
    { immediate: true },
  );

  const updateQuery = ({ val, name }) => {
    controlsState.value[`${name}`].props.value = val;
    store.dispatch('controls/setControls', controlsState.value);

    router.push({
      name: route.name,
      query: {
        ...route.query,
        [`${name}`]: val,
      },
    });
  };
</script>

<template>
  <div class="min-h-[300px] bg-white mt-auto shadow">
    <wc-tabs v-model:active="activeTab" :tabs="tabs">
      <template #[tabContentSlot]="{ tab }">
        <template v-if="controlsState && tab === 'controls'">
          <template v-for="control in controlsState" :key="control.name">
            <component
              :is="
                control.type === 'select'
                  ? components.WcSelect
                  : components.WcInput
              "
              v-bind="control.props"
              @update:value="(val) => updateQuery({ val, name: control.name })"
            />
          </template>
        </template>
        <template v-if="tab === 'documentation'"> DOCS </template>
      </template>
    </wc-tabs>
  </div>
</template>
