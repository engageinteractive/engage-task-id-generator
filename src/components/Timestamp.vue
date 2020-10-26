<template>
  <div class="flex text-sm leading-tight">
    <div
      class="shadow-sm flex flex-grow border rounded overflow-hidden mr-6"
      :class="[$data.isFocused ? ['shadow-outline', 'border-blue-400'] : 'border-input dark:border-input-dark']"
    >
      <label class="flex items-center py-2 w-1/2 uppercase bg-gray-100 dark:bg-gray-800 border-r border-input dark:border-input-dark text-xs text-gray-400 dark:text-gray-400 font-light cursor-pointer text-center" for="initials">
        <span class="w-full">Initials</span>
      </label>
      <input
        class="py-2 uppercase outline-none px-4 w-1/2 text-center text-gray-600 dark:bg-gray-900 dark:text-gray-100"
        type="text"
        id="initials"
        @focus="$data.isFocused = true"
        @blur="$data.isFocused = false"
        v-model="$root.$data.storage.initials"
      >
    </div>
    <button
      class="shadow-sm flex items-center h-input flex-grow-0 text-white bg-coral rounded px-3 hover:bg-coral-light focus:outline-none active:bg-coral-dark"
      @click="copy"
    >
      <span class="py-2 mx-1">Copy</span>
      <icon class="w-4 mx-1" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'Timestamp',

  data() {
    return {
      isFocused: false,
    };
  },

  methods: {
    copy() {
      const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
      const usr = this.$root.$data.storage.initials.toUpperCase();
      this.$root.copyToClipboard(`${usr}${date}`);
    },
  },
}
</script>