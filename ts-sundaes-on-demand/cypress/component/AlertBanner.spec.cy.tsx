import AlertBanner from 'pages/common/AlertBanner';

describe('ComponentName.cy.ts', () => {
	it('playground', () => {
		cy.mount(<AlertBanner message="hello world" variant="danger" />);
		cy.get('.alert-danger').should('contain.text', 'hello world');
	});
});
