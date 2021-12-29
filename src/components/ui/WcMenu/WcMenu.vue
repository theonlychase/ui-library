<script setup lang="ts">
  import { api, Origin, Position } from './composables';
  interface MenuProps {
    origin?: Origin;
    position?: Position;
    value?: boolean;
  }

  const emit = defineEmits(['update:value']);
  const props = withDefaults(defineProps<MenuProps>(), {
    origin: 'right',
    position: 'right',
    value: false,
  });

  const { computedClasses, menu, showMenu } = api(emit, props);
</script>

<template>
  <div ref="menu" class="relative max-w-max">
    <div v-if="$slots.activator" @click="showMenu = !showMenu">
      <slot name="activator" />
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-to-class="transform opacity-0 scale-95"
      leave-from-class="transform opacity-100 scale-100"
    >
      <div
        v-if="showMenu"
        class="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-gray900 ring-opacity-5 focus:outline-none"
        :class="computedClasses"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="option-menu-button"
        tabindex="-1"
      >
        <div class="py-1" role="none">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>
