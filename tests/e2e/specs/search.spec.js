import 'cypress-file-upload';
describe('Search Test', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080')
    })
    it('Search', () => {
        cy.wait(3000)
        cy.get('.search-input').type('gta')
        cy.wait(1000)
        cy.get('.form-search').submit()
        cy.wait(3000)
        for(var i = 0; i <= 5 ; i++){
            cy.scrollTo('bottom' , { duration : 1500 })
        }
        cy.wait(1000)
        cy.scrollTo('top' , { duration : 1500 })
        cy.wait(1000)
        cy.get('.search-input').type('mario')
        cy.wait(1000)
        cy.get('.form-search').submit()
        cy.wait(3000)
        for(var i = 0; i <= 8 ; i++){
            cy.scrollTo('bottom' , { duration : 1500 })
        }
        cy.wait(1000)
        cy.scrollTo('top' , { duration : 1500 })
        cy.wait(2000)
    })
  })
  