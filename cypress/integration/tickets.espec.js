describe("Tickets", () =>{
    beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"));

    it ("fills all  the text input filds", () =>{
        const firstName = "Anderson";
        const lastname = "Santos";
        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastname);
        cy.get("#email").type("Anderson.cosme@gmail.com");
        cy.get("#requests").type("Sagitário");
        cy.get("#signature").type(`${firstName} ${lastname}`);
    });

    it ("select two tickets", () =>{
        cy.get("#ticket-quantity").select("2");
    });

    it ("select 'vip' ticket type", () => {
        cy.get("#vip").check();
    });

    it ("selects 'social media' checkbox", () => {
        cy.get("#social-media").check();
    });

    it ("selects 'friend', and 'publication', then uncheck ' friend'", () => {
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#friend").uncheck();
    });

    it ("has 'TiCKETBOX' header's heading", () => {
        cy.get("header h1").should("contain", "TICKETBOX");
    });

    it ("alerts on invalid email", () => {
        cy.get("#email")
        .as("email")
        .type("Anderson.cosme-gmail.com");

        cy.get("#email.invalid").should("exist");

        cy.get("@email")
        .clear()
        .type("Anderson.cosme@gmail.com");

        cy.get("#email.invalid").should("not.exist");

    });

    it ("Fills and reset the form", () => {
        const firstName = "Anderson";
        const lastname = "Santos";
        const fullName = `${firstName} ${lastname}`;
        
        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastname);
        cy.get("#email").type("Anderson.cosme@gmail.com");
        cy.get("#ticket-quantity").select("2");
        cy.get("#vip").check();
        cy.get("#friend").check();
        cy.get("#requests").type("IPA beer");

        cy.get(".agreement p").should(
            "contain",
            `I, ${fullName}, wish to buy 2 VIP tickets.`
        );

        cy.get("#agree").click();
        cy.get("#signature").type(fullName);

        cy.get("button[type='submit']")
        .as("submitButton")
        .should("not.be.disabled");

        cy.get("button[type='reset']").click();
        cy.get("@submitButton").should("be.disabled");
        
    });

    it ("fills mandatory fields using support command", () => {
        const customer = {
            firstName: "Jota",
            lastname: "Cunha",
            email: "Jotacunha@gmail.com"
        };

        cy.fillMandatoryFields(customer);

        cy.get("button[type='submit']")
          .as("submitButton")
          .should("not.be.disabled");


        cy.get("#agree").uncheck();
        cy.get("@submitButton").should("be.disabled");

    });
});
