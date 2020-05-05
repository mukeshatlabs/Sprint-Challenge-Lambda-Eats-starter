
describe('test pizza form', ()=>{
  it('vists the pizza order form page', ()=>{
    cy.visit('http://localhost:3000/pizza')
  })

  it('type name into the name field', ()=>{
    cy.get('#name')
      .type('mukesh').should('have.value', 'mukesh')
  })

  it('.select() - select an option in a <select> element', () => {
    cy.get('#pizzasize')
      .should('have.value', "")
    cy.get('#pizzasize').select('Personal')
    cy.get('#pizzasize').should('have.value', 'Personal')
  })


  it('select a checkbox', ()=>{
    cy.get('[for="pepperoni"] > input')
      .check().should('be.checked')
  })

  it('select another checkbox', ()=>{
    cy.get('[for="olives"] > input')
      .check().should('be.checked')
  })

  it('.submit() - submit a form', () => {
    cy.get('form').submit()
  })
  
})

