<template>
  <div>
    <div class="resources-head">
      <h3> Recursos</h3>
    </div>
    <div class="resources-body">
      <div class="resources-body-list">
        <ul v-if="resources">
          <li v-for="(item, index) in recursosFiltrados" :key="index">  
            <input type="checkbox" :id="'checkbox_' + index" v-model="item.checked" @change="checkboxChange(item)" class="custom-checkbox">
            <label :for="'checkbox_' + index">{{ item.nome }}</label>  
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { modulesStore } from '@/store/modules.js';
import { watch, ref, onMounted } from 'vue';

export default {
  props: {
    resources: Object,
    gestaoTipo: String,
    modulo: String,
  },
  setup(props) {
    const store = modulesStore();
    let recursosFiltrados = ref([])


    const obterRecursosFiltrados = async (novoModulo) => {
      try {
        recursosFiltrados.value = await store.getResources(novoModulo, props.gestaoTipo)

      } catch (error) {
        console.error('Erro durante a execução do watch:', error)
      }
    }

    onMounted(() => {
      obterRecursosFiltrados(props.modulo)
    })

    watch(() => props.modulo, (novoModulo) => {
      obterRecursosFiltrados(novoModulo)
    })

    const checkboxChange = () => {
      store.calcularChecked()
      store.calculateTotalCheckedValue();
      store.getConsultoria()
    };

    return { recursosFiltrados, checkboxChange }
  },
};
</script>

<style scoped>
.resources-head{
  background-color: #0181e2;
  width: 500px;
  border-top-right-radius: 10px;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  padding: 20px 30px;
}

.resources-body{
  padding: 40px 30px;
  font-size: 12px;
  font-weight: 400;
  color: rgb(155, 170, 191);
  height: 630px;
  user-select: none;
}

.resources-body-list{
  height: 410px;
  overflow: auto;
}

ul li:first-child{
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

li{
  padding: 15px;
  border: 1px solid #e1ecf5;
}
.custom-checkbox {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 18px;
  height: 18px;
  background-color: #D7E4EF;
  border: 2px solid #D7E4EF;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  margin-right: 8px;
  vertical-align: middle;
}

label{
  cursor: pointer;
}

.custom-checkbox:checked {
  background-color: #1cca85;
  border-color: #1cca85;
  color: #fff; 
}

.custom-checkbox:checked + label{
  color: rgb(87, 110, 144);
}

</style>
