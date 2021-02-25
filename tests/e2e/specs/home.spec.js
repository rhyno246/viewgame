// https://docs.cypress.io/api/introduction/api.html

describe('Home and Detail test', () => {

  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })
  it('Click Slug Menu', () => {
    cy.wait(3500)
    cy.get('.nav-link').eq(2).click()
    cy.wait(3500)
    cy.get('.nav-link').eq(9).click()
    cy.wait(3500)
    for(i = 0 ; i <= 5 ; i++){
      cy.scrollTo('bottom', { duration: 3500 })
    }
    cy.wait(2000)
    cy.scrollTo('top', { duration: 2000 , force: true })
    cy.wait(2500)
    cy.get('.game__item').eq(0).trigger('mouseover', { force: true })
    cy.wait(2500)
    cy.get('.fullvideo').click({ force: true })
    cy.wait(4000)
    cy.get('.close-model').click({ force: true })
    cy.wait(2000)
    cy.get('.nav-link').eq(4).click()
    cy.wait(2000)
    cy.get('.game__item').eq(2).trigger('mouseover', { force: true })
    cy.wait(2000)
    cy.get('.slide__control span').eq(0).trigger('mouseover', { force: true })
    cy.wait(1000)
    cy.get('.slide__control span').eq(1).trigger('mouseover', { force: true })
    cy.wait(1000)
    cy.get('.slide__control span').eq(2).trigger('mouseover', { force: true })
    cy.wait(1000)
    cy.get('.slide__control span').eq(3).trigger('mouseover', { force: true })
    cy.wait(1000)
    cy.get('.slide__control span').eq(4).trigger('mouseover', { force: true })
    cy.wait(1000)
    cy.get('.slide__control span').eq(5).trigger('mouseover', { force: true })
    cy.wait(1000)
    cy.get('.slide__control span').eq(6).trigger('mouseover', { force: true })
    cy.wait(2000)
    cy.get('.switch-column__colums').last().click({ force: true })
    cy.wait(1000)
    cy.get('.switch-column__colums').first().click({ force: true })
    cy.wait(2000)
    cy.get('.select').click({ force: true }).type('Web')
    cy.wait(100)
    cy.get('#app').click({ force: true })
    cy.wait(5000)
    cy.get('.select-1').click({ force: true }).type('Rating')
    cy.wait(100)
    cy.get('#app').click({ force: true })
    cy.wait(5000)
    cy.get('.select').click({ force: true }).type('PC')
    cy.wait(100)
    cy.get('#app').click({ force: true })
    cy.wait(5000)
    cy.get('.card__name').eq(0).click()
    cy.wait(5000)
    cy.scrollTo('bottom', { duration: 500 })
    cy.wait(1000)
    cy.scrollTo('top', { duration: 500 })
    cy.wait(500)
    for(i = 0; i < 2; i ++ ){
      cy.get('.txt-name a').click({ force: true })
      cy.wait(800)
    }
    cy.get('.play-trailer').click({ force: true })
    cy.wait(3000)
    cy.get('.close-model').click({ force: true })
    cy.wait(2000)
    cy.get('.logo a').click({ force: true })
  })
})