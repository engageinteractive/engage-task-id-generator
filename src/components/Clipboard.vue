<template>
  <transition
    @enter="enter"
    @leave="leave"
  >
    <div
      v-if="this.$root.$data.clipboard"
      :class="[
        'absolute inset-0 z-20',
        'flex flex-col items-center justify-center',
        'cursor-pointer',
        'bg-white dark:bg-gray-900',
        'text-gray-800 dark:text-white',
      ]"
    >
      <div ref="particles" class="relativ z-0 w-8 mb-4 text-coral">
        <icon ref="icon" class="relative z-10" />

        <particle
          v-for="(particle, index) in $data.particles"
          :key="index"
          :color="particle"
          class="z-0"
        />
      </div>
      <p ref="text" class="relative z-10 font-light text-base leading-none text-center dark:text-white">
        <span>Copied</span>
        <span
          :class="[
            'inline-block',
            'p-1 mx-1',
            'rounded',
            'bg-gray-800 dark:bg-white',
            'text-white dark:text-black text-sm leading-none font-mono',
          ]"
          v-text="this.$root.$data.clipboard"
        />
      </p>
    </div>
  </transition>
</template>

<script>
import Particle from '@/components/Particle.vue'

import { gsap } from 'gsap';

export default {
  name: 'Clipboard',

  components: {
    Particle,
  },

  data() {
    return {
      particles: [],
    };
  },

  methods: {
    pop() {
      const total = 16;
      const colors = ['green', 'blue', 'purple', 'pink', 'yellow', 'orange', 'red'];

      // bg-green-400
      // bg-blue-400
      // bg-purple-400
      // bg-pink-400
      // bg-yellow-400
      // bg-orange-400
      // bg-red-400

      this.$data.particles = [];

      for (let i = 0; i < total; i++) {
        this.$data.particles[i] = colors[Math.floor(Math.random() * colors.length)];
      }
    },

    enter(el, done) {
      gsap.fromTo(el, {
        opacity: 0,
      }, {
        opacity: 1,
        duration: 0.2,
      });

      gsap.fromTo(this.$refs.icon.$el, {
        yPercent: -100,
        opacity: 0,
      }, {
        yPercent: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'elastic.out(1, 0.75)',
        onComplete: () => {
          done();

          setTimeout(() => {
            this.$root.$data.clipboard = false;
            this.$data.particles = [];

            // Is this a better experience?
            // window.close();
          }, 1000);
        },
      });

      gsap.fromTo(this.$refs.text, {
        opacity: 0,
      }, {
        opacity: 1,
        duration: 0.45,
        delay: 0.05,
        ease: 'cubic.easeOut',
      });

      this.pop();
    },
    leave(el, done) {
      gsap.to(el, {
        opacity: 0,
        duration: 0.2,
        onComplete: done,
      });
    },
  },
}
</script>