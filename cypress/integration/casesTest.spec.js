describe("Cases to resolve", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("https://tienda.movistar.com.ar/");
  });

  it("CP001 - Validar cuotas en compra de equipo -Cuotas.12 -Equipo.A52", () => {
    cy.fixture("validatePhone").then(validate => {
      cy.get(validate.searchIcon).click();
      cy.get(validate.searchType).type("a52").should("have.value", "a52");
      cy.get(validate.searchButton).click();
      cy.get(validate.buyButton).click();
      cy.url().should("include", "a52");
      cy.get(validate.description)
        .contains("12 cuotas")
        .should("contain", "12 cuotas");
    })
  });

  it("CP002 - Aplicar filtro de equipos -Gama.Alta -Memoria Interna.256GB", () => {
    cy.get("#layered-filter-block > .block-title > strong")
      .as("filterClick")
      .click();
    cy.get('[attribute="price"] > .filter-options-content')
      .contains("$200.000 y superior")
      .should("contain", "$200.000 y superior")
      .click();
    cy.wait(1500);
    cy.get("@filterClick").click();
    cy.get('[attribute="movistar_internalmemory"]')
      .contains("256GB")
      .should("contain", "256GB")
      .click();
    cy.get("#toolbar-amount").then(($span) => {
      const textAmount = $span.text();
      cy.log(textAmount);
    });
  });

  // it("CP002 Otra opcion en la que funciona el caso 2, utilizando de otra manera el wait y el intercept", () => {
  //   cy.get("#layered-filter-block > .block-title > strong")
  //     .as("filterClick")
  //     .click();
  //   cy.intercept("https://tienda.movistar.com.ar/?price=200000-300000").as(
  //     "url"
  //   );
  //   cy.get('[attribute="price"] > .filter-options-content')
  //     .contains("$200.000 y superior")
  //     .should("contain", "$200.000 y superior")
  //     .click();
  //   cy.wait("@url");
  //   cy.get("@filterClick").click();
  //   cy.intercept(
  //     "https://tienda.movistar.com.ar/?movistar_internalmemory=916&price=200000-300000"
  //   ).as("url2");
  //   cy.get('[attribute="movistar_internalmemory"]')
  //     .contains("256GB")
  //     .should("contain", "256GB")
  //     .click();
  //   cy.wait("@url2");
  //   cy.get("#toolbar-amount").then(($span) => {
  //     const textAmount = $span.text();
  //     cy.log(textAmount);
  //   });
  // });

  it("CP003 - Validar cuotas en compra de equipo -Cuotas.60 -Equipo.Tercero de la lista -Banco.Credicoop -Tarjeta.Visa", () => {
    cy.get('.wrapper > .products > :nth-child(3)').click()
    cy.get('#open-installments-modal').click()
    cy.get('#selectBank').select("Credicoop").should("have.value", "Credicoop")
    cy.get('#selectCardByBank').select("Visa").should("have.value", "Visa")
    cy.get('.bold-tr > td').should("not.contain", "60")
  })

  it("CP004 - Buscar Motorola - Seleccionar el que contenga RAZR - Verificar equipo liberado - Verificar que venga con cargador", () => {
    cy.fixture("validatePhone").then(validate => {
      cy.get(validate.searchIcon).click();
      cy.get(validate.searchType).type("Motorola").should("have.value", "Motorola");
      cy.get(validate.searchButton).click();
      cy.contains("RAZR").should("contain", "RAZR").click()
      cy.url().should("include", "razr");
      cy.get('#open-buyonline-modal').click()
      cy.get('#buyonline-modal > .content').contains("Equipo liberado").should("contain", "Equipo liberado")
      cy.get('.buyonline-modal > .modal-inner-wrap > .modal-footer > button').click()
      cy.get('#tab-label-box-content-title').click()
      cy.get('.box-content-container').contains("Cargador").should("contain", "Cargador")

    })
  })
});