import ScoopOption from 'pages/entry/ScoopOption';

it('indicate if scoop count is non-int or out of range', () => {
	cy.mount(<ScoopOption name="" imagePath="" updateItemCount={cy.stub()} />);

	// expect input to be invalid with negative number
	cy.get('input').clear();
	cy.get('input').type('-1');
	cy.get('input').should('have.class', 'is-invalid');

	// replace with decimal input
	cy.get('input').clear();
	cy.get('input').type('2.5');
	cy.get('input').should('have.class', 'is-invalid');

	// replace with input that's too high
	cy.get('input').clear();
	cy.get('input').type('11');
	cy.get('input').should('have.class', 'is-invalid');

	// replace with valid input
	// note: here we're testing our validation rules (namely that the input can display as valid)
	// and not react-bootstrap's response
	cy.get('input').clear();
	cy.get('input').type('3');
	cy.get('input').should('not.have.class', 'is-invalid');
});
