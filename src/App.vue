<template>
  <div id="app">
    <h2 class="title">Vue Piano</h2>
    <p class="subtitle">
      Samples are provided by the <a href="http://theremin.music.uiowa.edu/MISpiano.html" target="_blank">University of Iowa's Electronic Music Studio</a>
      </p>
    <div id="content">
      <Keyboard :start="3" :octaves="3" :keysMap="keys" />
    </div>
    <p class="repository">
      Repository:
      <a href="https://github.com/toriphes/vue-piano" target="_blank">https://github.com/toriphes/vue-piano</a>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import Keyboard from './components/Keyboard.vue';
import Keymap from './keymap';

@Component({
  components: {
    Keyboard
  }
})
export default class App extends Vue {
  @Provide() keys = Keymap;
}
</script>

<style lang="scss">
@font-face {
  font-family: 'Dancing Script';
  src: url('./assets/fonts/DancingScript-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'Dancing Script';
  src: url('./assets/fonts/DancingScript-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Spirax';
  src: url('./assets/fonts/Spirax-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

body {
  font-family: Helvetica;
  background: #eee;
  margin: 0;
  padding: 0;
}

a,
a:active,
a:link,
a:visited {
  color: #4fc08d;
}

#content {
  flex: 1;
  display: flex;
  overflow-x: scroll;
  padding-bottom: 20px;
  justify-content: center;
}

.title {
  margin-top: 20px;
  font-family: 'Dancing Script';
  font-size: 46px;
  text-align: center;
  font-weight: bold;
  margin: 0;
}

.subtitle {
  font-family: 'Spirax';
  text-align: center;
  margin: 40px 0 40px 0;
}

.repository {
  margin: 40px 0 0 0;
  text-align: center;
}

@media only screen and (max-device-width: 736px) {
  .title,
  .subtitle,
  .repository {
    display: none;
  }

  #content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
