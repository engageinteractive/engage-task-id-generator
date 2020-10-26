<template>
	<div>
		<div class="relative bg-gray-100 dark:bg-gray-900">
			<ul class="flex relative whitespace-no-wrap z-10">
				<li
					v-for="(tab, index) in $data.tabs"
					:key="tab.label"
					v-text="tab.label"
					:class="[
						'px-5 py-3',
						'border-b-2 border-transparent',
						'cursor-pointer',
						'text-sm',
						'transition-colors duration-100',
						'hover:text-coral',
						'dark:text-white',
						[ index === $data.selected ? 'text-coral dark:text-coral border-coral' : 'text-gray-600 dark:text-gray-400' ],
					]"
					@click="$data.selected = index"
				/>
			</ul>

			<span class="absolute right-0 bottom-0 left-0 h-1px bg-gray-200 dark:bg-gray-700 z-0" />
		</div>

		<div ref="wrapper" class="relative overflow-hidden bg-white dark:bg-gray-900">
			<div class="relative z-10" ref="inner">
				<slot />
			</div>

			<svg
				viewBox="0 0 231 231"
				xmlns="http://www.w3.org/2000/svg"
				class="absolute z-0 top-0 bottom-0 left-0 opacity-50"
			>
				<path d="M0 31l200 200H0V31z" class="fill-gray-100 dark:fill-gray-800" />
				<path d="M200 231H27l87-86 86 86z" class="fill-gray-200 dark:fill-gray-700" />
			</svg>
		</div>
	</div>
</template>

<script>
import { gsap } from 'gsap';

export default {
	name: 'Tabs',

	data() {
		return {
			tabs: [],
			selected: this.$root.storage.tab,
		};
	},

	watch: {
		selected(newTab, oldTab) {
			gsap.set(this.$refs.wrapper, {
				height: this.$refs.wrapper.offsetHeight,
			});

			this.$children[newTab].$data.active = true;
			this.$children[oldTab].$data.active = false;

			this.$root.$data.storage.tab = newTab;

			setTimeout(() => {
				gsap.to(this.$refs.wrapper, {
					height: this.$refs.inner.offsetHeight,
					clearProps: 'all',
					duration: 0.2,
					ease: 'Cubic.easeInOut',
				});
			}, 50);
		},
	},

	mounted() {
		this.$data.tabs = this.$children;
	},
}
</script>