import Vue from 'vue'
import App from './App.vue'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)
Vue.directive("wheel", (el, bin) => {
  el.addEventListener(
    "wheel",
    event => {
      if (!!bin.modifiers.up && event.deltaY < 0) {
        bin.value();
      } else if (!!bin.modifiers.down && event.deltaY > 0) {
        bin.value();
      } else if (!bin.modifiers.down && !bin.modifiers.up) {
        const dir = event.deltaY < 0 ? "up" : "down";
        bin.value(dir);
      }
    },
    { passive: true }
  );
});
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
