import { OrderDetailsProvider } from 'contexts/OrderDetails';
import OrderEntry from 'pages/entry/OrderEntry';

it('handles error for scoops and toppings routes', () => {
	cy.intercept('GET', 'http://localhost:3030/scoops', {
		statusCode: 500,
	});
	cy.intercept('GET', 'http://localhost:3030/toppings', {
		statusCode: 500,
	});

	cy.mount(
		<OrderDetailsProvider>
			<OrderEntry setOrderPhase={cy.stub()} />
		</OrderDetailsProvider>
	);

	cy.get('.alert').should('have.length', 2);
});

it('disable order button if there are no scoops ordered', () => {
	cy.intercept('GET', 'http://localhost:3030/scoops', {
		fixture: 'scoops.json',
	});
	cy.intercept('GET', 'http://localhost:3030/toppings', {
		fixture: 'toppings.json',
	});

	cy.mount(
		<OrderDetailsProvider>
			<OrderEntry setOrderPhase={cy.stub()} />
		</OrderDetailsProvider>
	);

	// // order button should be disabled at first, even before options load
	cy.get('button')
		.contains('order sundae', { matchCase: false })
		.should('be.disabled');

	// expect button to be enabled after adding scoop
	cy.get('[id^="Vanilla"]').should('exist');

	cy.get('[id^="Vanilla"]').clear();
	cy.get('[id^="Vanilla"]').type('1');
	cy.get('button')
		.contains('order sundae', { matchCase: false })
		.should('be.enabled');

	// expect button to be disabled again after removing scoop
	cy.get('[id^="Vanilla"]').clear();
	cy.get('[id^="Vanilla"]').type('0');

	cy.get('button')
		.contains('order sundae', { matchCase: false })
		.should('be.disabled');
});
