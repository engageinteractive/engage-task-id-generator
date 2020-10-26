<template>
  <div>
    <div
      class="text-gray-600 dark:text-gray-100 relative border rounded shadow-sm bg-white dark:bg-gray-900"
      :class="[$data.isFocused ? ['shadow-outline', 'border-blue-400'] : 'border-input dark:border-input-dark']"
    >
      <select
        ref="select"
        name="client-list"
        class="bg-transparent h-input w-full outline-none pl-4 pr-10 appearance-none text-sm font-light"
        @focus="$data.isFocused = true"
        @blur="$data.isFocused = false"
        @change="change"
      >
        <option disabled selected>Select a client</option>

        <option
          v-for="(client, index) in $data.clients"
          :key="index"
          v-text="client.name"
          :value="client.abbrv"
        />
      </select>

      <icon name="arrows" class="absolute w-4 right-4 top-1/2 transform -translate-y-1/2" />
    </div>

    <list
      class="mt-6"
      :items="$root.storage.recentTasks"
      @select="copy"
    />
  </div>
</template>

<script>
export default {
  name: 'TaskId',

  props: {
    url: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      clients: {},
      isFocused: false,
    };
  },

  methods: {
    change() {
      const select = this.$refs.select;

      this.copy({
        value: select.value
      });

      this.store({
        value: select.value,
        label: select[select.selectedIndex].text,
      });
    },

    copy(item) {
      this.$root.copyToClipboard(`[${ item.value }${ Math.floor((Math.random() * 99999) + 1) }]`);
    },

    store(val) {
      let exists = false;

      this.$root.$data.storage.recentTasks.forEach((obj) => {
          if( obj.value === val.value ){
              exists = true;
          }
      });

      if (!exists) {
        this.$root.$data.storage.recentTasks.unshift(val);

        // Limit the length to 4
        if (this.$root.$data.storage.recentTasks.length >= 4) {
          this.$root.$data.storage.recentTasks.length = 4;
        }
      }
    },
  },

  mounted() {

    fetch(this.$props.url)
      .then(response => response.text())
      .then(json => {
        this.$data.clients = JSON.parse(json).clients;
      });

  },
}
</script>