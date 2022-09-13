import { OrderDetailsProvider } from 'contexts/OrderDetails';
import Options from 'pages/entry/Options';

it('displays image for each scoop option from server', () => {
	cy.intercept('GET', 'http://localhost:3030/scoops', {
		fixture: 'scoops.json',
	});

	cy.mount(
		<OrderDetailsProvider>
			<Options optionType="scoops" />
		</OrderDetailsProvider>
	);
	// // find images
	cy.get('img[alt~="scoop"]').should('have.length', 2);
	// // confirm alt text of images
	cy.get('img[alt="Chocolate scoop"]').should('exist');
	cy.get('img[alt="Vanilla scoop"]').should('exist');
});

it.only('Displays image for each toppings option from server', () => {
	cy.intercept('GET', 'http://localhost:3030/toppings', {
		fixture: 'toppings.json',
	});

	cy.mount(
		<OrderDetailsProvider>
			<Options optionType="toppings" />
		</OrderDetailsProvider>
	);

	cy.get<HTMLImageElement>('img[alt~="topping"]').should('have.length', 3);
	cy.get<HTMLImageElement>('img[alt="Cherries topping"]').should('exist');
	cy.get<HTMLImageElement>('img[alt="M&Ms topping"]').should('exist');
	cy.get<HTMLImageElement>('img[alt="Hot fudge topping"]').should('exist');
});

it("don't update total if scoops input is invalid", () => {
	cy.intercept('GET', 'http://localhost:3030/scoops', {
		fixture: 'scoops.json',
	});

	cy.mount(
		<OrderDetailsProvider>
			<Options optionType="scoops" />
		</OrderDetailsProvider>
	);

	// expect button to be enabled after adding scoop
	cy.get('[id^="Vanilla"]').should('exist');

	cy.get('[id^="Vanilla"]').clear();
	cy.get('[id^="Vanilla"]').type('-1');
	cy.get('[id^="Vanilla"]').should('have.class', 'is-invalid');

	// make sure scoops subtotal hasn't updated
	cy.contains('Scoops total: $0.00').should('exist');

	cy.get('[id^="Vanilla"]').clear();
	cy.get('[id^="Vanilla"]').type('1');
	cy.contains('Scoops total: $2.00').should('exist');
});
