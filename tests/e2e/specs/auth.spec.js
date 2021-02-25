import 'cypress-file-upload';
describe('Authentication Test', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080')
    })
    it('Authentication', () => {
        cy.wait(5000)
        cy.get('.control-connect li').last().click()
        cy.wait(2000)
        cy.get('.dont-have').last().click()
        cy.wait(500)
        cy.get('.name').type('mannguyen')
        cy.wait(500)
        cy.get('.email').type('nguyentrongminhman95@gmail.com')
        cy.wait(500)
        cy.get('.pw').type('minhman')
        cy.wait(500)
        cy.get('.cfpw').type('minhman')
        cy.wait(500)
        cy.get('.checksignup').click()
        cy.wait(500)
        cy.get('.button-position').click()
        cy.wait(2000)
        cy.get('.profile').click({ force: true })
        cy.wait(1000)
        cy.get('[type="text"]').clear({force: true})
        cy.wait(200)
        cy.get('.name-user').type('Minh Man')
        cy.wait(500)
        cy.get('.save-change').click({ force: true })
        cy.wait(3000)



        // cy.fixture('cypress/fixtures/admin.jpg').then((fileContent ) => {
        //     cy.get('input[type="file"]').attachFile({
        //         fileContent: fileContent.toString(),
        //         fileName: './logo.png',
        //         mimeType: 'image/png'
        //     });
        // })


        cy.get('.v-tab').click({ multiple: true })
        cy.wait(2000)
        cy.get('.pw').type('Minhman1235')
        cy.wait(500)
        cy.get('.cfpw').type('Minhman1235')
        cy.wait(500)
        cy.get('.button-position').click()
        cy.wait(5000)
        cy.get('.logout').click({ force: true })
        cy.wait(1000)
        cy.get('.login').click()
        cy.wait(1000)
        cy.get('.email').type('nguyentrongminhman95@gmail.com')
        cy.wait(1000)
        cy.get('.pw').type('Minhman1235')
        cy.wait(500)
        cy.get('.btn-login').click()
        cy.wait(5000)
        cy.get('.add-favourite').eq(0).click({ multiple: true , force: true })
        cy.wait(500)
        cy.get('.add-favourite').eq(1).click({ multiple: true , force: true })
        cy.wait(500)
        cy.get('.add-favourite').eq(2).click({ multiple: true , force: true })
        cy.wait(1000)
        cy.get('.profile').click({ force: true })
        cy.wait(1000)
        cy.get('.v-tab').eq(1).click({ force: true })
        cy.wait(2000)
        cy.get('.delete').eq(0).click({ force : true })
        cy.wait(2000)
        cy.get('.delete-ok').click({ force: true })
        cy.wait(2000)
        cy.get('.logo a').click({ force: true })
    })
  })
  