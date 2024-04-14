// @ts-ignore
describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.get('button#login-button').click()
    cy.get(`#login-modal`).should('exist')
    cy.contains('username').next().type('javad-cypress');
    cy.contains('password').next().type('cypress');
    cy.get('#login-register-button').click()
    cy.wait(6000);
    cy.contains('javad-cypress').should('exist')

    cy.get('body').then(($body) => {
      const $button = $body.find('#create-project-button');
      if ($button.length > 0) {
        cy.get('#create-project-button').click();
        cy.get('#add-project-modal').should('exist')
        cy.contains('Project title').next().type("cypress")
        cy.contains('Preferably in three lines').next().type("cypress description")
        cy.get('#modal-submit-create-project-button').click()

      } else {
        cy.log('create-project-button does not exist. Skipping the test.');
      }
    });

    cy.wait(1000);

    cy.get('#item-0').click();

    cy.wait(2000)


    cy.get('body').then(($body)=>{
      const $button= $body.find('#add-new-board-button')
      if ($button.length > 0){
        cy.get('#add-new-board-button').click()
        cy.get('#add-board-modal').should("exist")
        cy.contains('Board name').next().type('Todo')
        cy.get('#modal-submit-add-board-button').click()
      }else {
        cy.log('add-new-board-button does note exist. skipping the test.')
      }
    })
    cy.get('#add-box-icon-button-boardItem-0').click();
    cy.get('#add-task-modal').should('exist')
    cy.contains('Task title').next().type('cypress new task')
    cy.contains('Description in three lines').next().type('this is fires cypress task in flowBoard application ...')
    cy.get('#modal-submit-add-task-button').click()

    cy.wait(2000)

    cy.get('body').then(($body)=>{
      const $button= $body.find('#add-new-board-header-button')
      if ($button.length > 0){
        cy.get('#add-new-board-header-button').click()
        cy.get('#add-board-modal').should("exist")
        cy.contains('Board name').next().type('InProgress')
        cy.get('#modal-submit-add-board-button').click()
      }else {
        cy.log('add-new-board-button does note exist. skipping the test.')
      }
    })

    cy.wait(2000)

    cy.get('#add-box-icon-button-boardItem-1').click();
    cy.get('#add-task-modal').should('exist')
    cy.contains('Task title').next().type('cypress InProgress task')
    cy.contains('Description in three lines').next().type('this is fires cypress InProgress task in flowBoard application ...')
    cy.get('#modal-submit-add-task-button').click()

  })
})