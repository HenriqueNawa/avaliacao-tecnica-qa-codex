// Alterar de acordo com esta armazenado o projeto
const localDoProjeto = '../../index.html';

describe("Funcionalidade Calculadora de Orçamento", () => {
    beforeEach(() => {
        cy.visit(localDoProjeto);
    });


    // Caso de teste negativo: Não permite o cálculo da reserva
    it('Não permite menor de idade fazer reserva', () => {
        // Preenche as entradas para o cálculo do orçamento
        cy.fixture('calculadoraDados.json').then((usuarios) => {
            cy.get('#valorPassagem').type(usuarios.usuario1.valorPassagem) 
            cy.get('#numeroPessoas').type(usuarios.usuario1.numeroPessoas) 
            cy.get('#diasHospedagem').type(usuarios.usuario1.diasHospedagem) 
            cy.get('#dataNascimento').type(usuarios.usuario1.dataNascimento)
        });
    
       
       // Ação: Calcular orçamento
        cy.contains('Calcular').click()

        // Verifica se a idade do usuário, se for menor, gera um aviso impedindo o prosseguimento da ação
        cy.on('window:alert', (alert) => {
            expect(alert).to.equal('Você deve ter pelo menos 18 anos para fazer uma reserva.');
          });

    });


    // Caso de teste Positivo: Calcula o valor da reserva
    it('Calcula o orçamento da viagem conforme os dados inseridos', () => {
        // Preenche as entradas para o cálculo do orçamento
        cy.fixture('calculadoraDados.json').then((usuarios) => {
            cy.get('#valorPassagem').type(usuarios.usuario2.valorPassagem) 
            cy.get('#numeroPessoas').type(usuarios.usuario2.numeroPessoas) 
            cy.get('#diasHospedagem').type(usuarios.usuario2.diasHospedagem) 
            cy.get('#dataNascimento').type(usuarios.usuario2.dataNascimento)
        }); 
       
       // Ação: Calcular orçamento
        cy.contains('Calcular').click()

        // Verifica se o resultado do orçamento esta correto
        cy.get('#resultadoOrcamento').should('contain','4600.00')

    });
  });