<template>
  <div>
    <div class="modules-head">
      <h3>Módulos</h3>
    </div>
    <div class="modules-body">
      <ul v-if="module">
        <template v-for="(module, key) in module" :key="key">
          <li v-if="!Array.isArray(module.items)" >
            <button  @click="moduloClicked(key)" :class="{ 'clicked-button': key === clickedButton }">
              <span class="span-point"></span> 
              {{ module.title }}
            </button>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
  
<script>
export default {
  props: {
    module: Object,
  },
  data() {
    return {
      clickedButton: null,
    };
  },
  methods: {
    exibirRecurso(module){
      this.$emit('exibirRecurso', module);
    },
    moduloClicked(clicked){
      this.clickedButton = clicked;
      this.$emit('moduloClicked', clicked);
    }
  }
};
</script>

<style scoped>
.clicked-button {
  color: #32445e;
  font-weight: 500;
  border: 1px solid #e2e2f6;
}
.modules-head {
  background-color: #0091ff;
  width: 300px;
  border-top-left-radius: 10px;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  padding: 20px 30px;
}

.modules-body {
  padding: 40px 30px;
  background-color: #fff;
  height: 640px;
  border-bottom-left-radius: 10px;
  user-select: none;
}

button {
  display: flex;
  align-items: center;
  width: 240px;
  gap: 5px;
  font-size: 14px;
  font-weight: 400;
  color: rgb(65, 87, 119);
  cursor: pointer;
  background-color: #fff;
  padding: 9px;
  border: 1px solid #fff;
  border-radius: 5px;
  margin-bottom: 13px;
}

.span-point {
  display: inline-block;
  height: 23px;
  width: 23px;
  background-color: #1CCA85;
  border: 1px solid #1CCA85;;
  border-radius: 50%;
}
</style>
