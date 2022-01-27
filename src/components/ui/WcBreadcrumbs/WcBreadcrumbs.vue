<script setup lang="ts">
  import WcIcon from '@/components/ui/WcIcon/WcIcon.vue';
  interface BreadcrumbItem {
    text: string;
    href: string;
    disabled?: boolean;
  }
  interface BreadcrumbProps {
    items: BreadcrumbItem[];
    size?: 'small' | 'medium';
  }

  const props = withDefaults(defineProps<BreadcrumbProps>(), {
    items: () => [],
    size: 'small',
  });
</script>

<template>
  <nav v-if="items.length" class="flex" aria-label="Breadcrumb">
    <ol
      role="list"
      class="flex items-center"
      :class="size === 'small' ? 'space-x-1' : 'space-x-3'"
    >
      <li v-for="(item, index) in items" :key="item.text">
        <div class="flex items-center">
          <wc-icon v-if="index > 0" name="chevronRight" size="xSmall" />
          <a
            :href="item.href"
            class="first:ml-0 text-sm font-medium text-gray-500 hover:text-gray-700"
            :class="{
              'ml-1': size === 'small',
              'ml-3': size === 'medium',
              'pointer-events-none': item.disabled || false,
            }"
          >
            {{ item.text }}
          </a>
        </div>
      </li>
    </ol>
  </nav>
</template>
