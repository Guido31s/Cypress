
import MainPage from "../support/PageObjects/MainPage"

Cypress.Commands.add("searchPhone", (value) => {
    cy.fixture("validatePhone").then(validate => {
        cy.get(validate.searchIcon).click();
        cy.get(validate.searchType).type(value).should("have.value", value);
        cy.get(validate.searchButton).click();
    })
})

Cypress.Commands.add("searchWithClasses", (value) => {
    MainPage.getSearchIcon();
    MainPage.getTypeSearch(value);
    MainPage.getTypeButton();
    MainPage.getBuyButton()
})

