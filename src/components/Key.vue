<template>

  <v-touch class="key" v-bind:class="getCssClasses()" 
    @press="play()" 
    @pressup="fadeOut()"
    @mouseout="fadeOut()"
    >
    <audio ref="audio" :src="src" preload="auto"></audio>
    <label>
        <span v-if="keyCode !== -1" class="keychar">{{ char }}</span>
        <span class="octave">{{name}}</span>
    </label>
  </v-touch>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Key extends Vue {
  @Prop({ default: null })
  name!: string;

  @Prop({ default: null })
  src!: string;

  @Prop({ default: -1 })
  keyCode!: number;

  protected pressed: boolean = false;

  protected interval: number = 0;

  public $refs!: {
    audio: HTMLAudioElement;
  };

  isBlack() {
    return this.name[1] === '#';
  }

  getNote() {
    return this.name[0].toUpperCase();
  }

  get char() {
    return String.fromCharCode(this.keyCode);
  }

  play() {
    this.stop();
    const audio = this.$refs.audio;
    this.$refs.audio.play();
    this.pressed = true;
  }

  stop() {
    this.$refs.audio.pause();
    this.$refs.audio.currentTime = 0;
    this.$refs.audio.volume = 1.0;
    window.clearInterval(this.interval);
  }

  fadeOut() {
    this.pressed = false;
    const audio = this.$refs.audio;
    const stepFade = () => {
      if (audio.volume < 0.03) {
        this.stop();
      } else {
        if (audio.volume > 0.2) {
          audio.volume = audio.volume * 0.95;
        } else {
          audio.volume = audio.volume - 0.01;
        }
      }
    };
    window.clearInterval(this.interval);
    this.interval = window.setInterval(stepFade, 10);
  }

  mounted() {
    this.$parent.$on('keydown', (keycode: number) => {
      if (keycode === this.keyCode && !this.pressed) {
        this.play();
      }
    });

    this.$parent.$on('keyup', (keycode: number) => {
      if (keycode === this.keyCode) {
        this.fadeOut();
      }
    });
  }

  protected getCssClasses() {
    const classes: any = { 'is-black': this.isBlack(), pressed: this.pressed };
    classes[this.getNote().toLowerCase()] = true;
    return classes;
  }
}
</script>


<style scoped lang="scss">
.key {
  border: 1px solid #222;
  width: 50px;
  z-index: 1;
  height: 100%;
  box-shadow: 0px 5px 1px rgba(32, 32, 32, 0.2);
  border-radius: 0 0 5px 5px;
  font-size: 12px;
  position: relative;
  background: #fff;
  //touch-action: manipulation;

  &.d,
  &.e,
  &.a,
  &.b,
  &.g {
    margin-left: -15px;
  }

  &.f,
  &.c {
    margin-left: 2px;
  }

  &.is-black {
    background: #000;
    width: 30px;
    color: #fff;
    z-index: 2;
    height: 70%;
    margin-left: -15px;
  }

  label {
    bottom: 15px;
    position: absolute;
    width: 100%;
    text-align: center;

    .keychar {
      display: block;
      margin-bottom: 15px;
      font-weight: bold;
    }
  }

  &.pressed {
    box-shadow: 2px 0 3px rgba(0, 0, 0, 0.1) inset,
      -5px 5px 20px rgba(0, 0, 0, 0.2) inset, 0 0 3px rgba(0, 0, 0, 0.2);
  }
}
</style>
