import { OrderDetailsProvider } from 'contexts/OrderDetails';
import OrderConfirmation from 'pages/confirmation/OrderConfirmation';

it('Successfully load order', () => {
	// // override default msw response for options endpoint with error response

	cy.intercept('POST', 'http://localhost:3030/order', {
		fixture: 'order.json',
	});

	cy.mount(
		<OrderDetailsProvider>
			<OrderConfirmation setOrderPhase={() => {}} />
		</OrderDetailsProvider>
	);

	cy.contains('Thank You!');
});

it('error response from server for submitting order', () => {
	// // override default msw response for options endpoint with error response

	cy.intercept('POST', 'http://localhost:3030/order', {
		statusCode: 500,
	});

	cy.mount(
		<OrderDetailsProvider>
			<OrderConfirmation setOrderPhase={() => {}} />
		</OrderDetailsProvider>
	);

	cy.get('.alert').contains(
		'An unexpected Error occurred. Please try again later.',
		{ matchCase: false }
	);
});
