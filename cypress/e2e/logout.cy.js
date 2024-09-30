describe('Teste de Logout', () => {
    it('Teste de Logout', () => {
        cy.visit('http://localhost:8080');
        cy.viewport(1920, 1080);
        cy.get('button.button-login').click();
        cy.get('input#email').type('admin@admin.com');
        cy.get('input#password').type('Admin@123');
        cy.get('button[type="submit"]').click();
        cy.wait(1000)
        cy.get('.button-profile').click();
        cy.contains('button', 'Sair').click();
    });
});