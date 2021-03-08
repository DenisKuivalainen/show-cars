describe("test tabs", () => {
    before(() => cy.visit("http://localhost:3000/"));

    it("to tab 2", () => {
        cy.get('button[aria-controls="tabpanel-1"]')
            .click();
        
        cy.get('div[id="tabpanel-0"]')
            .should("to.be", "hidden");

        cy.get('div[id="tabpanel-1"]')
            .should("not.to.be", "hidden")
    });

    it("to tab 1", () => {
        cy.get('button[aria-controls="tabpanel-0"]')
            .click();
        
        cy.get('div[id="tabpanel-0"]')
            .should("not.to.be", "hidden");

        cy.get('div[id="tabpanel-1"]')
            .should("to.be", "hidden")
    });
});

describe("test section 1", () => {
    before(() => cy.visit("http://localhost:3000/"));

    it("change fuel value to 100", () => {
        cy.get("input[class='MuiSelect-nativeInput']")
            .parent()
            .eq(0)
            .click();

        cy.get("li")
            .contains("100")
            .click();

        cy.get("td")
            .contains(/^[a-zA-Z0-1]/gm);
    });

    it("change interior and exterior values", {defaultCommandTimeout: 100000}, () => {
        cy.get("input[class='MuiSelect-nativeInput']")
            .parent()
            .eq(2)
            .click();

        cy.get("li")
            .contains("Good")
            .click()
            .type("{esc}");
                
        cy.get("input[class='MuiSelect-nativeInput']")
            .parent()
            .eq(1)
            .click();

        cy.get("ul > li")
            .contains("Good")
            .click();

        cy.get("td")
            .should("not.contain", "Unacceptable");
    });

});