describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  //query to find the day that contains the text "Tuesday" and click on it
  it("should navigate to Tuesday", () => {
    cy.visit("/");
    
    // cy.get("li")
    //   .contains("Tuesday")
    
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});