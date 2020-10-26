<template>
    <div class="w-2 h-2 absolute top-1/2 left-1/2 -mt-1 -ml-1">
		<span
			ref="inner"
			class="block w-2 h-2 rounded-full"
			:class="`bg-${$props.color}-400`"
		/>
    </div>
</template>

<script>
import { gsap } from 'gsap';

export default {
	name: 'Icon',

	props: {
		color: {
			type: String,
			required: true,
		},
	},

	mounted() {
		const a = Math.random() * Math.PI * 2;
		const r = gsap.utils.random(60, 100);

		gsap.fromTo(this.$el, {
			scale: 0,
		}, {
			scale: gsap.utils.random(0.6, 1),
			x: Math.cos(a) * r,
			y: (Math.sin(a) * r) - 50,
			duration: 2,
			delay: 0.15,
			ease: 'Expo.easeOut',
		});

		gsap.to(this.$refs.inner, {
			y: '+=60',
			opacity: 0,
			delay: 0.15,
			ease: 'Cubic.easeIn',
			duration: 1,
		});
	},
}
</script>