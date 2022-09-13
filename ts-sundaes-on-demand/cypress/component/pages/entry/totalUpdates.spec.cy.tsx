import { OrderDetailsProvider } from 'contexts/OrderDetails';
import Options from 'pages/entry/Options';

it('update scoop subtotal when scoops change', () => {
	cy.mount(
		<OrderDetailsProvider>
			<Options optionType="scoops" />
		</OrderDetailsProvider>
	);

	// make sure total starts out $0.00
	cy.contains('Scoops total: $', { matchCase: false }).should(
		'contain.text',
		'0.00'
	);

	// update vanilla scoops to 1 and check the subtotal
	cy.get('input[type="number"][id^="Vanilla"]').should('exist');
	cy.get('input[type="number"][id^="Vanilla"]').clear();
	cy.get('input[type="number"][id^="Vanilla"]').type('1');
	cy.contains('Scoops total: $', { matchCase: false }).should(
		'contain.text',
		'2.00'
	);

	// update chocolate scoops to 2 and check subtotal
	cy.get('input[type="number"][id^="Chocolate"]').should('exist');
	cy.get('input[type="number"][id^="Chocolate"]').clear();
	cy.get('input[type="number"][id^="Chocolate"]').type('2');
	cy.contains('Scoops total: $', { matchCase: false }).should(
		'contain.text',
		'6.00'
	);
});

it('update toppings subtotal when toppings change', () => {
	// render parent component
	cy.mount(
		<OrderDetailsProvider>
			<Options optionType="toppings" />
		</OrderDetailsProvider>
	);

	// make sure total starts out at $0.00
	cy.contains('Toppings total: $', { matchCase: false }).should(
		'contain.text',
		'0.00'
	);

	// add cherries and check subtotal
	cy.get('input[type="checkbox"][id^="Cherries"]').should('exist');
	cy.get('input[type="checkbox"][id^="Cherries"]').click();
	cy.contains('Toppings total: $', { matchCase: false }).should(
		'contain.text',
		'1.50'
	);

	// add hot fudge and check subtotal
	cy.get('input[type="checkbox"][id^="Hot fudge"]').should('exist');
	cy.get('input[type="checkbox"][id^="Hot fudge"]').click();
	cy.contains('Toppings total: $', { matchCase: false }).should(
		'contain.text',
		'3.00'
	);

	// remove hot fudge and check subtotal
	cy.get('input[type="checkbox"][id^="Hot fudge"]').click();
	cy.contains('Toppings total: $', { matchCase: false }).should(
		'contain.text',
		'1.50'
	);
});

// describe('grand total', () => {
// 	it('grand total updates properly if scoop is added first', () => {
// 		// Test that the total starts out at $0.00
// 		render(<OrderEntry setOrderPhase={jest.fn()} />);
// 		const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/ });
// 		expect(grandTotal).toHaveTextContent('0.00');

// 		// update vanilla scoops to 2 and check grand total
// 		const vanillaInput = screen.findByRole('spinbutton', {
// 			name: 'Vanilla',
// 		});
// 		userEvent.clear(vanillaInput);
// 		userEvent.type(vanillaInput, '2');
// 		expect(grandTotal).toHaveTextContent('4.00');

// 		// add cherries and check grand total
// 		const cherriesCheckbox = screen.findByRole('checkbox', {
// 			name: 'Cherries',
// 		});
// 		userEvent.click(cherriesCheckbox);
// 		expect(grandTotal).toHaveTextContent('5.50');
// 	});

// 	it('grand total updates properly if topping is added first', async () => {
// 		render(<OrderEntry setOrderPhase={jest.fn()} />);

// 		// add cherries and check grand total
// 		const cherriesCheckbox = screen.findByRole('checkbox', {
// 			name: 'Cherries',
// 		});
// 		userEvent.click(cherriesCheckbox);
// 		const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/ });
// 		expect(grandTotal).toHaveTextContent('1.50');

// 		// update vanilla scoops to 2 and check grand total
// 		const vanillaInput = screen.findByRole('spinbutton', {
// 			name: 'Vanilla',
// 		});
// 		userEvent.clear(vanillaInput);
// 		userEvent.type(vanillaInput, '2');
// 		expect(grandTotal).toHaveTextContent('5.50');
// 	});

// 	it('grand total updates properly if item is removed', async () => {
// 		render(<OrderEntry setOrderPhase={jest.fn()} />);

// 		// add cherries
// 		const cherriesCheckbox = screen.findByRole('checkbox', {
// 			name: 'Cherries',
// 		});
// 		userEvent.click(cherriesCheckbox);
// 		// grand total $1.50

// 		// update vanilla scoops to 2; grand total should be $5.50
// 		const vanillaInput = screen.findByRole('spinbutton', {
// 			name: 'Vanilla',
// 		});
// 		userEvent.clear(vanillaInput);
// 		userEvent.type(vanillaInput, '2');

// 		// remove 1 scoop of vanilla and check grand total
// 		userEvent.clear(vanillaInput);
// 		userEvent.type(vanillaInput, '1');

// 		// check grand total
// 		const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/ });
// 		expect(grandTotal).toHaveTextContent('3.50');

// 		// remove cherries and check grand total
// 		userEvent.click(cherriesCheckbox);
// 		expect(grandTotal).toHaveTextContent('2.00');
// 	});
// });
