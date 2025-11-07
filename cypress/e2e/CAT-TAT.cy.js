


describe('Central de Atendimento ao Cliente TAT', () => {
    
  beforeEach(() => {
    cy.visit('./src/index.html')  
  })
  // ./ --> notação para quando a pagina interna a que quero aceder está na mesma linha que o documento em que estou a escrever ( neste caso estou dentro da pasta e2e que está na 'mesma linha' que o src) 
  
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envia o formulário',() =>{
    //ações
    cy.get('#firstName').type('Laura')
    cy.get('#lastName').type('Valente')
    cy.get('#email').type('laura@gmail.com')
    const longText = Cypress._.repeat('abcdefghijklmnoprstuvwxyz', 10) // repete o abc 10X
    cy.get('#open-text-area').type(longText, {delay : 0})
    cy.get('.button[type=submit').click()
    //resultados
    cy.get('.success').should('be.visible')
  })
 it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () =>{
  //ações
  cy.get('#firstName').type('Laura')
  cy.get('#lastName').type('Valente')
  cy.get('#email').type('laura@gmail,com') // add uma virgula --> formato errado --> dá erro
  cy.get('#open-text-area').type('Teste')
  cy.get('.button[type=submit').click()
  cy.get('.error').should('be.visible')
 })
 it('campo telefónico continua vazio quando preenchido com valor não numérico', () => {
  cy.get('#phone')
    .type('abcde')
    .should('have.value', '')
 })
 it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
  //primeiro preencheu-se os campos
  cy.get('#firstName').type('Laura')
  cy.get('#lastName').type('Valente')
  cy.get('#email').type('laura@gmail,com') // add uma virgula --> formato errado --> dá erro
  cy.get('#open-text-area').type('Teste')
  //antes de submeter o form cliquei no checkbox de teelmovel, tornando-o obrigatorio
  cy.get('#phone-checkbox').click()
  cy.get('.button[type=submit').click()
  //como não se preencheu o valor do telemovel, surge a mensagem de erro
  cy.get('.error').should('be.visible')
 })
 it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
  cy.get('#firstName').type('Laura')
  .should('have.value', 'Laura')
  .clear()
  .should('have.value', '')
  cy.get('#lastName')
    .type('Valente')
    .should('have.value', 'Valente')
    .clear()
    .should('have.value', '')
  cy.get('#email').type('laura@gmail.com')
    .should('have.value', 'laura@gmail.com')
    .clear()
    .should('have.value', '')
  cy.get('#phone').type('977777777')
  .should('have.value', '977777777')
    .clear()
    .should('have.value', '')
})
it.only(' exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', () => {
  cy.get('button[type="submit"]').click()
  //cy.contains('button', 'Enviar').click  //como não se preencheu o valor do telemovel, surge a mensagem de erro
  cy.get('.error').should('be.visible')
})

it.only('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () =>
{
cy.get('button[type="submit"]').click()
cy.get('.error').should('be.visible')
})

 it('envia o formuário com sucesso usando um comando customizado', () => {
    const data = {
      firstName:'Laura',
      lastName: 'Valente',
      email: 'lau@gmail.com',
      text:'obg'
    } 
    cy.fillMandatoryFieldsAndSubmit(data) // chama comando costumizado
    cy. get('.success').should('be.visible')
  })

  // sessão 4 -----------------------------------------
it('Seleciona um produto (YouTube) por seu texto', () => {
  cy.get('#product').select('youtube').should('have.value', 'youtube') 
  })
it('Seleciona um produto (Mentoria) por seu valor (value)', () => {
  cy.get('#product').select('mentoria').should('have.value', 'mentoria') 
  })


it('Seleciona um produto (Blog) por seu índice', () => {
  cy.get('#product').select(1).should('have.value', 'blog') 
  })

it('marca o tipo de atendimento "Feedback"', () => {
  cy.get('input[type="radio"][value = "feedback"]')
  .check()
  .should('be.checked') 
  })

it('marca cada  tipo de atendimento', () => {
  cy.get('input[type="radio"]')
  .each(typeOfService => {
    cy.wrap(typeOfService)
      .check()
  .should('be.checked')   })
  
  })


it('Marca ambos checkboxes, depois desmarca o último', () => {
  cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')   
  })
  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
  //primeiro preencheu-se os campos
  cy.get('#firstName').type('Laura')
  cy.get('#lastName').type('Valente')
  cy.get('#email').type('laura@gmail,com') // add uma virgula --> formato errado --> dá erro
  cy.get('#open-text-area').type('Teste')
  //antes de submeter o form cliquei no checkbox de teelmovel, tornando-o obrigatorio
  cy.get('#phone-checkbox').check()
  cy.get('.button[type=submit').click()
  //como não se preencheu o valor do telemovel, surge a mensagem de erro
  cy.get('.error').should('be.visible')
 })

  it('seleciona um arquivo da pasta fixtures', () => {
  //primeiro preencheu-se os campos
  cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json') // fui buscar o relative path
    .should( input =>{
      expect(input[0].files[0].name).to.be.equal('example.json')
      //console.log(input[0].files[0].name) // imprime o nome do ficheiro na consola

    }) // Tambem posso add uma funlao de callback
 })
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um aliap', () => {
  //primeiro preencheu-se os campos
  cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'}) // fui buscar o relative path
    .should( input =>{
      expect(input[0].files[0].name).to.be.equal('example.json')
      //console.log(input[0].files[0].name) // imprime o nome do ficheiro na consola

    }) // Tambem posso add uma funlao de callback
 })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
  //primeiro preencheu-se os campos
  cy.fixture('example.json').as('sampleFile')
  cy.get('#file-upload')
    .selectFile('@sampleFile') // fui buscar o relative path
    .should( input =>{
      expect(input[0].files[0].name).to.be.equal('example.json')
      //console.log(input[0].files[0].name) // imprime o nome do ficheiro na consola

    }) // Tambem posso add uma funlao de callback
 })

// ----------------------------------------------------------

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    //cy.get('a').should('have.attr', 'target', '_blank') --> esta tinha sido a minha sugestão mas estava errada.
    cy.contains('a', 'Política de Privacidade') //usa-se o contains para ciar uma selecao mais especifica
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank') 
      //and-> quando se quer fazer mais uma verificação sobre o mesmo sijeito. Desta forma conseguimos fazer 2 verificações sobre o memso sujeito.
 })
  it('Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade') //identifica o site da politica de privacidade
      .invoke('removeAttr','target') // quando tiro o target, abro na mesma pagina em vez de abrir numa nova pagina
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible') // garante que o titulo da pagina Politica de privacidade é visivel
 })
   it('testa a página da política de privacidade de forma independente', () => {
    // testar d eforma independente significa sem passar pela pagina inicial, mas sim dirigindo-me diretamente à pagina da politica de privacidade
    cy.contains('a', 'Política de Privacidade') //identifica o site da politica de privacidade
      .invoke('removeAttr','target') // quando tiro o target, abro na mesma pagina em vez de abrir numa nova pagina
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible') // garante que o titulo da pagina Politica de privacidade é visivel
 })

})

// Bloco describe - define a suite de testes
//  bloco it - define o caso de teste.