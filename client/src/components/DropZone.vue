<template>
  <div class="dropzone" 
      v-on:click="openFileSelection"
      v-on:dragover="onDragOver"
      v-on:dragleave="onDragLeave"
      v-on:drop="onDrop"
      v-bind:class="{hightlight: hightlight, disabled: !enabled}"
      >
    <div>Add files</div>
    <input ref="fileInput" class="file-input" type="file" multiple v-on:change="onFileChanged" />
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

@Component
export default class DropZone extends Vue {
  @Prop() private msg!: string;

  @Prop({ default: true })
  private enabled!: boolean;

  private hightlight = false;

  openFileSelection(): void {
    if (!this.enabled) return;
    (<HTMLElement>this.$refs.fileInput).click();
  }

  onDragOver(event: DragEvent): void {
    if (!this.enabled) return;
    event.preventDefault();
    this.hightlight = true;
  }

  onDragLeave(event: DragEvent): void {
    this.hightlight = false;
  }

  onDrop(event: DragEvent): void {
    if (!this.enabled) return;
    event.preventDefault();
    const files = event.dataTransfer.files;
    let result: File[] = [];
    for (var i = 0; i < files.length; i++) {
      result.push(<File>files.item(i));
    }
    this.$emit('filesAdded', result);
    this.hightlight = false;
  }

  onFileChanged(event: any) {
    let files: FileList = event.target.files;
    let result: File[] = [];
    for (var i = 0; i < files.length; i++) {
      result.push(<File>files.item(i));
    }
    this.$emit('filesAdded', result);
  }
}
</script>

<style scoped>
.dropzone {
  position: relative;
  border: 3px dashed #42b983;
  color: #42b983;
  font: bold 24px/200px arial;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
}

.hightlight {
  background-color: #b3dbc9;
}

.disabled {
  border: 3px dashed grey;
  color: grey;
}

.file-input {
  display: none;
}
</style>
