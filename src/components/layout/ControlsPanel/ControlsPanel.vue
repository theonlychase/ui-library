<script setup lang="ts">
  import { useRouter, useRoute } from 'vue-router';
  import { useStore } from 'vuex';
  import { computed, defineAsyncComponent, watch } from 'vue';

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
  <div class="min-h-[500px] bg-white mt-auto shadow">
    <template v-if="controlsState">
      <template v-for="control in controlsState" :key="control.name">
        <component
          :is="
            control.type === 'select' ? components.WcSelect : components.WcInput
          "
          v-bind="control.props"
          @update:value="(val) => updateQuery({ val, name: control.name })"
        />
      </template>
    </template>
    <div v-else>NO CONTROLS FOR THIS STORY</div>
  </div>
</template>
