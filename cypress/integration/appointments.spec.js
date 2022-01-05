describe("Appoinments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    
    cy.contains("Monday");
  })
  
  it("should book and interview", () => {

    // find and click add button in second appt (first) 
    cy.get("[alt=Add]")
      .first()
      .click();
    
    // enter name into form
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");

    // choose an interviewer
    cy.get("[alt='Sylvia Palmer']")
      .click();

    // click on save button
    cy.contains("Save")
      .click();
    
    // see the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    // find and click edit button in second appt (first) 
    cy.get("[alt=Edit]")
      .first()
      .click({force: true});
    
    // clear old name and change to new name in second appt form
    cy.get("[data-testid=student-name-input]")
      .first()
      .clear()
      .type("Bob Ross");
    
    // choose an interviewer
    cy.get("[alt='Tori Malcolm']")
      .click();
    
    // click on save button
    cy.contains("Save")
      .click();
    
    // see the edited appointment
    cy.contains(".appointment__card--show", "Bob Ross");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  })

  it("should cancel an interview", () => {

    // click delete button for existing appointment
    cy.get("[alt=Delete]")
      .first()
      .click({force: true});

    // click confirm button
    cy.contains("Confirm")
      .click();
    
    // check that "Deleting" indicator should exist
    cy.contains("Deleting")
      .should("exist");

    // check that "Deleting" indicator should not exist
    cy.contains("Deleting")
      .should("not.exist");

    // check ".appointment__card--dhow" element that contains text "Archie Cohen" should not exist
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });

});