<template>
    <ul
        v-if="$props.items.length"
        :class="[
            'overflow-hidden',
            'rounded shadow-list dark:shadow-list-dark',
            'bg-white dark:bg-gray-900',
            'leading-tight',
        ]"
    >
        <li
            v-for="(item, index) in $props.items"
            :key="index"
            :class="[
                'relative z-0',
                'group flex items-center justify-between',
                'px-4',
                'text-gray-600 dark:text-gray-100 text-sm font-light',
                'cursor-pointer',
                'hover:bg-coral hover:text-white hover:shadow-none hover:z-10',
                [ index !== 0 ? 'shadow-border-t dark:shadow-border-t-dark' : '' ],
            ]"
            @click="copy(item)"
        >
            <span class="py-3" v-text="item.label" />

            <icon class="invisible w-4 group-hover:visible" />
        </li>
    </ul>
</template>

<script>
export default {
  name: 'List',

  props: {
      items: {
          type: Array,
          required: true,
      },
  },

  methods: {
    copy(item) {
        this.$emit('select', item);
    },
  },
}
</script>