<script setup lang="ts">
  const props = defineProps({
    active: {
      type: Boolean,
      default: false,
    },
    borderless: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
  });
</script>

<template>
  <div
    class="WcCard bg-white overflow-hidden divide-y divide-gray-200"
    :class="{
      'rounded-lg shadow ring-1 ring-gray-200 ring-inset': !borderless,
      'w-64': !block,
      'w-full max-w-full': block,
    }"
  >
    <div
      v-if="$slots.header"
      class="py-4"
      :class="{
        'px-4': !borderless,
      }"
    >
      <slot name="header" />
    </div>

    <div class="WcCard-content">
      <slot v-if="$slots.media" name="media" />

      <div
        class="WcCard-content_main py-4"
        :class="{
          'px-4': !borderless,
          'border-t border-gray-200': $slots.media,
        }"
      >
        <slot />
      </div>
    </div>

    <div
      v-if="$slots.footer"
      class="py-4"
      :class="{
        'px-4': !borderless,
      }"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
