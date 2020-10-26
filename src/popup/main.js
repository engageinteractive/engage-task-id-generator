import Vue from 'vue'
import App from './App.vue'
import '../assets/tailwind.css'

import Icon from '@/components/Icon.vue'
import List from '@/components/List.vue'

const dev = process.env.NODE_ENV === 'development';

const defaultStorage = {
	tab: 0,
	initials: '',
	recentTasks: [],
};

Vue.component('Icon', Icon);
Vue.component('List', List);

chrome.storage.sync.get(['storage'], (result) => {

	/* eslint-disable no-new */
	new Vue({
		el: '#app',

		render: h => h(App),

		data() {
			return {
				briefs: dev ? 'brief-templates.html' : 'brief-templates.html',
				clients: dev ? 'clients.json' : 'https://s3-eu-west-1.amazonaws.com/engageinteractive/extensions/task-id-generator/clients.json',
				ready: false,
				storage: Object.assign({}, defaultStorage, result.storage) || defaultStorage,
				clipboard: false,
				egg: {
					active: false,
					pos: 0,
					code: ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'],
					allowed: {
						37: 'left',
						38: 'up',
						39: 'right',
						40: 'down',
						65: 'a',
						66: 'b'
					},
				},
			};
		},

		watch: {
			storage: {
				handler() {
					chrome.storage.sync.set({
						storage: this.$data.storage,
					});
				},
				deep: true,
			},
		},

		methods: {
			copyToClipboard(data, label = false) {
				let input = false;

				if (data) {
					input = document.createElement('input');
					input.setAttribute('value', data);
					document.body.appendChild(input);
					input.select();
				}

				document.execCommand('copy');

				if (input) {
					document.body.removeChild(input);
				}

				// Do this better... Or not.
				this.$data.clipboard = label || data;
			},
		},

		mounted() {
			// add keydown event listener
			document.addEventListener('keydown', (e) => {
				// get the value of the key code from the key map
				const key = this.$data.egg.allowed[e.keyCode];

				// get the value of the required key from the konami code
				const requiredKey = this.$data.egg.code[this.$data.egg.pos];

				// compare the key with the required key
				if (key == requiredKey) {

					// move to the next key in the konami code sequence
					this.$data.egg.pos++;

					// if the last key is reached, activate cheats
					if (this.$data.egg.pos == this.$data.egg.code.length) {
						this.$data.egg.active = true;
						this.$data.egg.pos = 0;
					}

				} else {
					this.$data.egg.pos = 0;
				}
			});
		}
	});

});