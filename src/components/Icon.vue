<template>
    <svg :viewBox="icon.vb" fill="none" xmlns="http://www.w3.org/2000/svg" v-html="icon.html" />
</template>

<script>
export default {
  name: 'Icon',

  props: {
      name: {
          type: String,
          default: 'copy',
      },
  },

  computed: {
      icon() {
          return this.$data[this.$props.name];
      },
  },

  data() {
      return {
          copy: {
              vb: '0 0 15 16',
              html: '<path d="M5 3H3a2 2 0 00-1 1v9a2 2 0 001 2h8a2 2 0 001-2v0M5 3a2 2 0 001 1h2a2 2 0 001-1M5 3a2 2 0 011-2h2a2 2 0 011 2m0 0h2a2 2 0 011 1v3m2 3H6m0 0l2-3m-2 3l2 2" class="stroke-current" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
          },
          arrows: {
              vb: '0 0 14 14',
              html: '<path d="M4 4l3-3 3 3m0 6l-3 3-3-3" class="stroke-current" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
          },
      };
  },
}
</script>