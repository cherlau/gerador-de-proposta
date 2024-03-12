<template>
  <nav>
    <div style="width: 400px; height: 100%;"></div>
    <div class="content">
      <div>
        <h1>
          Personalize o melhor plano para sua
          <span class="span-highlight">construtora</span>.
        </h1>
      </div>
      <div class="container-buttons">
        <button :class="{ 'highlighted': activeButton === 'GestaoAtendimento' }" @click="navigateTo('GestaoAtendimento')">
          <span class="span-point"></span>Gestão de Atendimento
        </button>
        <button :class="{ 'highlighted': activeButton === 'GestaoEmpreendimentos' }" @click="navigateTo('GestaoEmpreendimentos')">
          <span class="span-point"></span>Gestão de Empreendimentos
        </button>
        <button :class="{ 'highlighted': activeButton === 'GestaoVendas' }" @click="navigateTo('GestaoVendas')">
          <span class="span-point"></span>Gestão de vendas
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TopContent',
  data() {
    return {
      activeButton: 'GestaoAtendimento', 
    };
  },
  methods: {
    navigateTo(component) {
      this.activeButton = component;
      this.$emit('navigate', component);
    },
  },
};
</script>

<style scoped>
  .highlighted {
    border: 1px solid #7cc7ff;
    color: #32445e;
  }

  .highlighted .span-point{
    background-color: #1CCA85;
}
  
  nav {
    background-color: aliceblue;
    height: 15vh;
    display: flex;
    flex-direction: row-reverse;
  }
  
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    margin: auto;
  }
  
  h1 {
    font-size: 30px;
    font-weight: 700;
    color: #32445E;
  }
  
  .span-highlight {
    color: #0091FF;
  }
  
  .container-buttons {
    display: flex;
    gap: 20px;
  }
  
  button {
    display: flex;
    font-size: 16px;
    font-weight: 600;
    color: rgb(136, 156, 185);
    padding: 15px 19px;
    gap: 8px;
    border-radius: 7px;
    border: 1px solid #C8D7E8;
    background-color: #fff;
    cursor: pointer;
    user-select: none;
  }
  
  .span-point {
    display: inline-block;
    height: 24px;
    width: 24px;
    background-color: #C8D7E8;
    border-radius: 50%;
  }
  </style>
  