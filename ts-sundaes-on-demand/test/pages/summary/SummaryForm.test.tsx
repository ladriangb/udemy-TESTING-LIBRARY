import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SummaryForm from 'pages/summary/SummaryForm';

test('Initial conditions', () => {
	render(<SummaryForm setOrderPhase={jest.fn()} />);
	const checkbox = screen.getByRole('checkbox', {
		name: /terms and conditions/i,
	});
	expect(checkbox).not.toBeChecked();

	const confirmButton = screen.getByRole('button', { name: /confirm order/i });
	expect(confirmButton).toBeDisabled();
});

test('Checkbox enables button on first click and disables on second click', async () => {
	render(<SummaryForm setOrderPhase={jest.fn()} />);
	const checkbox = screen.getByRole('checkbox', {
		name: /terms and conditions/i,
	});
	const confirmButton = screen.getByRole('button', { name: /confirm order/i });

	await userEvent.click(checkbox);
	expect(confirmButton).toBeEnabled();

	await userEvent.click(checkbox);
	expect(confirmButton).toBeDisabled();
});

test('popover responds to hover', async () => {
	render(<SummaryForm setOrderPhase={jest.fn()} />);

	// popover starts out hidden
	const nullPopover = screen.queryByText(
		/no ice cream will actually be delivered/i
	);
	expect(nullPopover).not.toBeInTheDocument();

	// popover appears upon mouseover of checkbox label
	const termsAndConditions = screen.getByText(/terms and conditions/i);
	await userEvent.hover(termsAndConditions);

	const popover = screen.getByText(/no ice cream will actually be delivered/i);
	expect(popover).toBeInTheDocument();

	// popover disappears when we mouse out
	await userEvent.unhover(termsAndConditions);

	screen.queryByText(/no ice cream will actually be delivered/i);
});
