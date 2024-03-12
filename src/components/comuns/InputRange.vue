<template>
    <div class="input-range">
      <div>
        <label for="slider">{{ tipo }}</label>
        <br><span>Personalize a quantidade desejada.</span>
        <br>
        <div class="input-range-content">
          <input
            type="range"
            id="slider"
            v-model="selectedValue"
            :min="limitsRange[1]"
            :max="limitsRange[2]"
            :step="limitsRange[0]"
          />
          <p>Valor selecionado: {{ selectedValue }}</p>
        </div>
      </div>
    </div>
  </template>
  
<script>
import { modulesStore } from '@/store/modules.js';
import { ref, watch, onMounted } from 'vue';

export default {
  name: 'InputRange',
  props: {
    limits: {
      type: Array,
    },
    tipo: {
      type: String,
    }
  },
setup(props) {
  const store = modulesStore();
  const tipo = ref(props.tipo);
  const limitsRange = store.getLimits(tipo.value);
  const selectedValue = ref(limitsRange[1]);

  watch(selectedValue, (selected) => {
    store.setRange(tipo.value, selected);
  });

  onMounted(() => {
    store.setRange(tipo.value, selectedValue.value);
  })

  return { selectedValue, limitsRange };
},

};
</script>
  
<style scoped>
.input-range{
  color: rgb(50, 68, 94);
}

input{
  width: 100%;
  cursor: pointer;
}

label{
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
}

span{
  font-size: 12px;
  font-weight: 400;
}

p{
  font-size: 13px;
  font-weight: 500;
}

.input-range-content{
  background-color: #fff;
  padding: 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-bottom: 40px;
  margin-top: 15px;
}

</style>