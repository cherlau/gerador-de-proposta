<template>
  <div v-if="apiLoaded" id="app">
    <top-content @navigate="component = $event"> </top-content>

    <main-content :content="component" ></main-content>
  </div>
  <div v-else>
    <div class="loading-container">
      <img src="https://gestao.appfacilita.com/planos/img/loader-bg-grey-blue.97ade1b6.svg" alt="Carregando...">
    </div>
  </div>
</template>

<script>
import TopContent from '@/components/layouts/TopContent.vue';
import MainContent from '@/components/layouts/MainContent.vue';
import { ref, onMounted } from 'vue';
import { modulesStore } from '@/store/modules.js';
import axios from 'axios';


export default {
  name: 'App',
  data: () => ({
    component: 'GestaoAtendimento'
  }),
  setup() {
    const store = modulesStore();
    const json = ref(store);
    const apiLoaded = ref(false); 

    const fetchModules = async () => {
      try {
        const response = await axios.get('https://gestao.appfacilita.com/wp-json/v1/facilita/?tipo=construtoras&version=7');
        
        store.setResponseData(response.data); 
        apiLoaded.value = true; 
      } catch (error) {
        console.error('Erro ao buscar módulos:', error);
      }
    };

    onMounted(fetchModules); 

    return { json, apiLoaded };
  },
  components: {
    TopContent,
    MainContent
  },
};
</script>

<style>
*{
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  
}

*::-webkit-scrollbar {
  height: 10px;
  width: 10px;
}

*::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #DBDEF0;
}

*::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: rgb(239, 240, 241);
}

body{
  padding: 0;
  background-color: #FBFCFC;
}
ul, li {
  margin: 0;
  padding: 0;
  list-style: none;
}
a{
  text-decoration: none;
  color: inherit
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.loading-container img {
  max-width: 11%;
  max-height: 11%;
}
</style>