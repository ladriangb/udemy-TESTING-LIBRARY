import { render, RenderOptions } from '@testing-library/react';
import { OrderDetailsProvider } from 'contexts/OrderDetails';

function renderWithContext(
	ui: React.ReactElement,
	options?: Omit<RenderOptions, 'queries'>
) {
	return render(ui, { wrapper: OrderDetailsProvider, ...options });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithContext as render };
