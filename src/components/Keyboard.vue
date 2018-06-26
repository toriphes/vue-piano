<template>
  <div class="keyboard">
    
    <Key v-for="key in getKeys()" 
      :key="key.note" 
      :name="key.note" 
      :src="key.src" 
      :keyCode="key.keyCode" />

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Key as K } from 'ts-keycode-enum';
import Key from './Key.vue';

const numberMap: { [number: number]: number } = {
  0: K.Zero,
  1: K.One,
  2: K.Two,
  3: K.Three,
  4: K.Four,
  5: K.Five,
  6: K.Six,
  7: K.Seven,
  8: K.Eight,
  9: K.Nine
};

@Component({
  components: {
    Key
  }
})
export default class Keyboard extends Vue {
  @Prop({ default: {} })
  keysMap!: { [char: string]: string };

  protected notes: string[] = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B'
  ];

  @Prop({ default: 2 })
  octaves!: number;

  @Prop({ default: 2 })
  start!: number;

  getKeys() {
    const keys: Array<{ note: string; src: string; keyCode: number }> = [];
    for (let i = 0; i < this.octaves; i++) {
      this.notes.forEach((note, index) => {
        const tone = Number(this.start) + i;

        const isBlack = note[1] === '#';
        const name = (isBlack ? this.notes[index + 1] + 'b' : note) + tone;
        const name2 = note + tone;
        let keyCode = -1;

        if (name2 in this.keysMap) {
          const char = this.keysMap[name2].toUpperCase() as any;
          keyCode = char in K ? parseInt(K[char]) : -1;
          if (Number.isInteger(parseInt(char))) {
            keyCode = numberMap[parseInt(char)];
          }
        }

        keys.push({
          note: note + tone,
          src: `./samples/Piano.mf.${name}.aiff.mp3`,
          keyCode
        });
      });
    }

    return keys;
  }

  mounted() {
    window.addEventListener('keyup', this.onKeyUp, false);
    window.addEventListener('keydown', this.onKeyDown, false);
  }

  beforeDestroy() {
    window.removeEventListener('keydown', this.onKeyDown, false);
    window.removeEventListener('keyup', this.onKeyUp, false);
  }

  onKeyDown(e: KeyboardEvent) {
    this.$emit('keydown', e.which);
  }

  onKeyUp(e: KeyboardEvent) {
    this.$emit('keyup', e.which);
  }
}
</script>


<style scoped lang="scss">
.keyboard {
  height: 200px;
  display: flex;
  user-select: none;
  justify-content: center;
}
</style>
