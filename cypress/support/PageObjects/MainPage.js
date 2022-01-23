class MainPage {
    getSearchIcon() {
        return cy.get("#search_mini_form > .actions").click()
    }
    getTypeSearch(value) {
        return cy.get("#search").type(value)
    }
    getTypeButton() {
        return cy.get(".action.search").click()
    }
    getBuyButton() {
        return cy.get("form > .action").click()
    }

}

module.exports = new MainPage()