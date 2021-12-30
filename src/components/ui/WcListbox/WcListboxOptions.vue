<script setup lang="ts">
  import { setScrollTop } from '@/components/ui/WcListbox/composables';
  import { nextTick, ref, watch } from 'vue';

  const props = defineProps({
    highlightedIndex: {
      type: Number,
      default: -1,
    },
    listboxOpen: {
      type: Boolean,
      default: false,
    },
    listboxLabel: {
      type: String,
      default: 'selector',
    },
    options: {
      type: Array,
      default: () => [],
    },
    selectedIndex: {
      type: Number,
      default: -1,
    },
  });

  const listboxMenu = ref<HTMLInputElement | null>(null);
  const listboxOptions = ref<Array<Element>>([]);

  watch(
    listboxMenu,
    async (val) => {
      await nextTick();
      if (props.listboxOpen) {
        if (val && val.children) {
          listboxOptions.value = [...val.children];
          props.selectedIndex !== -1 &&
            setScrollTop(props.selectedIndex, listboxMenu, listboxOptions);
        } else {
          listboxOptions.value = [];
        }
      }
    },
    {
      flush: 'post',
    },
  );

  watch(
    () => props.highlightedIndex,
    (val) => {
      setScrollTop(val, listboxMenu, listboxOptions);
    },
    {
      flush: 'post',
    },
  );
</script>

<template>
  <transition
    leave-to-class="opacity-0"
    leave-from-class="opacity-100"
    leave-active-class="transition ease-in duration-100"
    appear
  >
    <ul
      v-if="listboxOpen"
      ref="listboxMenu"
      class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
      tabindex="-1"
      role="listbox"
      :aria-labelledby="listboxLabel"
      :aria-activedescendant="`listbox-option-${selectedIndex}`"
    >
      <template v-if="options.length">
        <slot
          v-for="(option, optionIndex) in options"
          :option="option"
          :index="optionIndex"
        />
      </template>
      <slot v-else name="no-results" />
    </ul>
  </transition>
</template>
