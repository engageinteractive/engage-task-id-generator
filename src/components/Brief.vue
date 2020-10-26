<template>
  <div>
    <list
      :items="templates"
      @select="copy"
    />

    <div ref="copy" class="pointer-events-none absolute opacity-0" />
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'Brief',

  props: {
    url: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      templates: [],
    };
  },

  methods: {
    copy(item) {
      // Render the HTML
      this.$refs.copy.appendChild(item.value);

      // Create a new selection
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(item.value);
      selection.removeAllRanges();
      selection.addRange(range);

      // Copy to clipboard
      this.$root.copyToClipboard(false, item.label);

      // 🤚🎤
    },

    parseTemplates(str) {
      const html = new DOMParser().parseFromString(str, 'text/html');
      const templates = html.querySelectorAll('.template');

      templates.forEach(template => {
        this.$data.templates.push({
          label: template.dataset.label,
          value: template,
        });
      });
    },
  },

  mounted() {
    fetch(this.$props.url)
      .then(response => response.text())
      .then(this.parseTemplates);
  },
}
</script>