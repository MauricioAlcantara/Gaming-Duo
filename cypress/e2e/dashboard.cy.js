describe('Teste de filtros', () => {
    it('Teste de filtros', () => {
        cy.visit('http://localhost:8080');
        cy.viewport(1920, 1080);
        cy.get('button.button-login').click();
        cy.get('input#email').type('admin@admin.com');
        cy.get('input#password').type('Admin@123');
        cy.get('button[type="submit"]').click();
        cy.wait(1000)
        cy.get('.custom-select').eq(2).click();
        cy.get('.dropdown .option').contains('Duelista').click();
        cy.get('.search-btn').click();
        cy.contains('Italo').should('be.visible');
    });
});