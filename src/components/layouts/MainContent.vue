<template>
    <div>
      <component :is="content"></component>
    </div>
</template>

<script>
import GestaoAtendimento from '@/components/views/GestaoAtendimento.vue';
import GestaoEmpreendimentos from '@/components/views/GestaoEmpreendimentos.vue';
import GestaoVendas from '@/components/views/GestaoVendas.vue';

export default {
  name: 'MainContent',
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  components: {
    GestaoAtendimento,
    GestaoEmpreendimentos,
    GestaoVendas,
  },
};
</script>
