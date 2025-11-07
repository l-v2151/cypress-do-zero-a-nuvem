it('testa a pagina da política de peivacidade de forma independente'), () =>{
    cy.visit('./src/privacy.html')
    cy.contains('h1', 'CAT TAT - Política de Privacidade').should('be.visible')
    cy.contains('p', 'Talking about Testing').should('be.visible')}