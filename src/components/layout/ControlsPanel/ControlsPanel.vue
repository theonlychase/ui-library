<script setup lang="ts">
  import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';
  const router = useRouter();
  const route = useRoute();
  import { computed, defineAsyncComponent, watch } from 'vue';
  import { useStore } from 'vuex';
  const store = useStore();
  const components = {
    WcSelect: defineAsyncComponent(
      () => import('@/components/ui/WcSelect/WcSelect.vue'),
    ),
    // WcInput: defineAsyncComponent(
    //   () => import('@/components/ui/WcInput/WcInput.vue'),
    // ),
  };

  watch(
    () => route.path,
    async (val) => {
      await store.dispatch('controls/setControls', null);
      await router.replace({ query: {} });
    },
  );

  const controlsState = computed(() => store.state.controls.controls);

  const updateQuery = (val) => {
    controlsState.value.size.props.value = val;
    router.push({
      name: route.name,
      query: {
        size: val,
      },
    });
  };
</script>

<template>
  <div class="min-h-[500px] bg-white mt-auto shadow">
    {{ controlsState }}
    <template v-if="controlsState">
      <template v-for="comp in components">
        <component
          :is="comp"
          :value="controlsState.size.props.value"
          :options="controlsState.size.props.options"
          @update:value="updateQuery"
        />
      </template>
    </template>
  </div>
</template>
