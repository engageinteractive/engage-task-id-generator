<template>
  <transition
    @enter="enter"
    @leave="leave"
  >
    <div class="p-6" v-if="$data.active">
        <slot />
    </div>
  </transition>
</template>

<script>
import { gsap } from 'gsap';

export default {
  name: 'Tab',

  props: {
    label: {
      required: true,
      type: String,
    },
  },

  data() {
      return {
          active: this.$parent.$children.indexOf(this) === this.$parent.$data.selected,
      };
  },

  methods: {
    enter(el, done) {
      gsap.fromTo(el, {
        xPercent: 100,
      }, {
        xPercent: 0,
        duration: 0.4,
        ease: 'Cubic.easeInOut',
        onComplete: done,
      });
    },

    leave(el, done) {
      gsap.set(el, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: el.offsetWidth,
      });

      gsap.to(el, {
        xPercent: -100,
        duration: 0.4,
        ease: 'Cubic.easeInOut',
        onComplete: done,
      });
    },
  },
}
</script>