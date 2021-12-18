<script setup lang="ts">
  import { ref } from 'vue';

  const emit = defineEmits(['update:value']);
  const props = defineProps({
    fullscreen: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Boolean,
      default: false,
    },
  });

  const overlayTransition = ref(false);

  const showModal = () => {
    overlayTransition.value = !props.value;
    emit('update:value', !props.value);
  };
</script>

<template>
  <div class="WcModal-activator" @click="showModal">
    <slot name="activator" />
  </div>

  <teleport to="body">
    <transition
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-to-class="opacity-0"
      leave-from-class="opacity-100"
      appear
      @after-leave="emit('update:value', false)"
    >
      <div
        v-if="value"
        class="fixed z-50 inset-0 overflow-y-auto"
        :class="{
          'sm:flex sm:items-center sm:justify-center': fullscreen,
          'flex items-center justify-center': !fullscreen,
        }"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="flex justify-center text-center sm:p-0"
          :class="{
            'p-4': !fullscreen,
          }"
        >
          <div
            class="fixed inset-0 bg-gray-600 opacity-90 transition-opacity"
            aria-hidden="true"
            @click="overlayTransition = false"
          />

          <transition
            enter-active-class="ease-out duration-300"
            enter-from-class="opacity-0 scale-75"
            enter-to-class="opacity-100  scale-100"
            leave-active-class="ease-in duration-200"
            leave-to-class="opacity-0  scale-75"
            leave-from-class="opacity-100 scale-100"
            appear
            @after-leave="emit('update:value', false)"
          >
            <div
              v-if="overlayTransition"
              class="bg-white text-left overflow-hidden shadow-xl transform transition-all relative px-4 pt-5 pb-4 sm:my-8 sm:p-6 rounded-lg sm:max-w-lg"
              :class="{
                'h-screen w-full sm:h-auto sm:w-max': fullscreen,
              }"
            >
              <wc-icon
                name="closeOutlineStroke"
                color="gray500"
                hover-color="gray600"
                class="cursor-pointer absolute top-2 right-2"
                @click="overlayTransition = false"
              />
              <slot />
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </teleport>
</template>
