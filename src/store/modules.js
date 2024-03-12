import { defineStore } from 'pinia'

export const modulesStore = defineStore({
  id: 'modules',
  state: () => ({
    objectData: {},
    resourcedList: [],
    resourcesCheckedTrue: [],
    totalCheckedValue: 0,
    rangeCrm: 0,
    rangeUser: 0,
    rangeCrmReserva: 0,
    rangeEspelhoEmp: 0,
    rangeUsersAtivos: 0,
    rangeApiPublica: 0,
    rangeEspelhoVen: 0,
    rangeCrmFunil: 0,
    valueConsultoria: 0,
    paymentCycle: 0,
    totalValue: 0
  }),
  actions: {
    async setResponseData(modules) {
      this.objectData = modules
    },
    getNestedFiltredModules(tipo) {
      const arrayComRecursos = this.resourcedList;
      const objetoComModulos = {};
      const modulosUnicos = new Set();
    
      for (const modulo in arrayComRecursos) {
        for (const recurso in arrayComRecursos[modulo].items) {
          if (arrayComRecursos[modulo].items[recurso][tipo] !== '-' && !modulosUnicos.has(modulo)) {
            objetoComModulos[modulo] = arrayComRecursos[modulo];
            modulosUnicos.add(modulo);
          }
        }
      }
        
      return objetoComModulos;
    },
    setDiscont(){
      
      const discounts = this.objectData.discounts
      let valueDiscount

      for(const cicle in discounts){
        
        if(this.paymentCycle == cicle){
          valueDiscount = discounts[cicle].value
        }
      }

      const discount = 1 - (valueDiscount / 100)
      this.totalValue = this.totalValue * discount
    },
    getConsultoria(){
      let total = 0
  
      for (const i in this.resourcesCheckedTrue) {
    
        if(this.resourcesCheckedTrue[i].implantacao != 0){
          total += parseFloat(this.resourcesCheckedTrue[i].implantacao)
        }
      }

      this.valueConsultoria = total
    },
    getResources(moduloClicado, tipo){

      const arrayComRecursos = this.resourcedList
      const arrayPermitidos = this.objectData?.plans[tipo].items
      const recursosFiltrados = []

      for (const i in arrayComRecursos[moduloClicado]?.items) {
    
        const item = arrayComRecursos[moduloClicado]?.items[i]
            
        if (item[tipo] !== '-' ) {

          if(arrayPermitidos.includes(item.key)){
            recursosFiltrados.push(item)
          } else {
            recursosFiltrados.push(item)
          }
        }
      }

      return recursosFiltrados
    },
    getChecked(tipo){
      this.resourcesCheckedTrue = []
      
      const modules = this.objectData.modules
      const arrayPermitidos = this.objectData?.plans[tipo].items

      for(const i in modules){
        for(const j in modules[i].items){

          modules[i].items[j].checked = false

          if (modules[i].items[j][tipo] !== '-' ){

            if(arrayPermitidos.includes(j)){

              modules[i].items[j].checked = true
              this.resourcesCheckedTrue.push(modules[i].items[j] )
            } 
          }
        }
      }

      this.resourcedList = modules
      this.calculateTotalCheckedValue()
      this.calcTotal()
    },
    calcularChecked() {
      for (const i in this.resourcedList) {
        for (const j in this.resourcedList[i].items) {
          const item = this.resourcedList[i].items[j]
    
          if (item.checked && !this.resourcesCheckedTrue.includes(item)) {
            
            this.resourcesCheckedTrue.push(item)

          } else if (!item.checked && this.resourcesCheckedTrue.includes(item)) {

            const index = this.resourcesCheckedTrue.indexOf(item)

            if (index !== -1) {
              this.resourcesCheckedTrue.splice(index, 1)
            }
          }
        }
      }
      this.calcTotal()
    },
    calculateTotalCheckedValue() {
      let totalValue = 0
  
      for (const i in this.resourcedList) {
        for (const j in this.resourcedList[i].items) {

          const item = this.resourcedList[i].items[j]

          if (item.checked && item.preco) 
            totalValue += parseFloat(item.preco)
        }
      }

      this.totalCheckedValue = totalValue
      this.calcTotal()
    },
    calcTotal() {

      if ( this.rangeCrm > 0 && this.rangeUser > 0){
        this.totalValue = this.totalCheckedValue + this.rangeCrm + this.rangeUser
      }
      if( this.rangeCrmReserva > 0 && this.rangeEspelhoEmp > 0 && this.rangeUsersAtivos > 0 && this.rangeApiPublica > 0){
        this.totalValue = this.totalCheckedValue + this.rangeCrmReserva + this.rangeEspelhoEmp + this.rangeUsersAtivos + this.rangeApiPublica
      }
      if( this.rangeEspelhoVen > 0 && this.rangeCrmFunil > 0 && this.rangeUser > 0){
        this.totalValue = this.totalCheckedValue + this.rangeEspelhoVen + this.rangeCrmFunil + this.rangeUser
      }
    },
    getLimits(tipo){

      if(tipo === 'CRM') 
        return this.resourcedList.gestao_de_atendimentos.items.crm.gestao_de_atendimento.split("/")

      if(tipo === 'Usuários') 
        return this.resourcedList.gestao_de_usuarios.items.usuarios.limite.split("/")

      if(tipo === 'CRM (reservas)')
        return this.resourcedList.gestao_de_produtos.items.crm_reservas.limite.split("/")

      if(tipo === 'Espelho de Vendas - Gestão de Unidades e Tabelas')
        return this.resourcedList.gestao_de_vendas.items.espelho_de_vendas_gestao_de_unidades_e_tabelas.limite.split("/")

      if(tipo === 'Usuários Ativos')
        return this.resourcedList.gestao_de_usuarios.items.usuarios_ativos.limite.split("/")

      if(tipo === 'API Pública')
        return this.resourcedList.integracoes.items.api_publica.limite.split("/")

      if(tipo === 'Espelho de Vendas - Gestão de Unidades, Reservas e Tabelas')
        return this.resourcedList.gestao_de_vendas.items.espelho_de_vendas_gestao_de_unidades_reservas_e_tabelas.limite.split("/")

      if(tipo === 'CRM (funil)')
        return this.resourcedList.gestao_de_atendimentos.items.crm_funil.gestao_de_vendas.split("/")
    },
    setRange(tipo, range){

      if(tipo === 'CRM')
        this.rangeCrm = range * this.resourcedList.gestao_de_atendimentos.items.crm.preco_unitario
      
      if(tipo === 'Usuários'){
        this.rangeUser =  range * this.resourcedList.gestao_de_usuarios.items.usuarios.preco_unitario
      }
      if(tipo === 'CRM (reservas)')
        this.rangeCrmReserva =  range * this.resourcedList.gestao_de_produtos.items.crm_reservas.preco_unitario

      if(tipo === 'Espelho de Vendas - Gestão de Unidades e Tabelas')
        this.rangeEspelhoEmp =  range * this.resourcedList.gestao_de_vendas.items.espelho_de_vendas_gestao_de_unidades_e_tabelas.preco_unitario

      if(tipo === 'Usuários Ativos')
        this.rangeUsersAtivos = range * this.resourcedList.gestao_de_usuarios.items.usuarios_ativos.preco_unitario

      if(tipo === 'API Pública')
        this.rangeApiPublica = range * this.resourcedList.integracoes.items.api_publica.preco_unitario

      if(tipo === 'Espelho de Vendas - Gestão de Unidades, Reservas e Tabelas'){
        this.rangeEspelhoVen = range * this.resourcedList.gestao_de_vendas.items.espelho_de_vendas_gestao_de_unidades_reservas_e_tabelas.preco_unitario
      }
      if(tipo === 'CRM (funil)'){
        this.rangeCrmFunil = range * this.resourcedList.gestao_de_atendimentos.items.crm_funil.preco_unitario
      }

      this.calcTotal()
    },
    clearAllRanges() {
      this.rangeCrm = 0;
      this.rangeUser = 0;
      this.rangeCrmReserva = 0;
      this.rangeEspelhoEmp = 0;
      this.rangeUsersAtivos = 0;
      this.rangeApiPublica = 0;
      this.rangeEspelhoVen = 0;
      this.rangeCrmFunil = 0;
    },
}})
