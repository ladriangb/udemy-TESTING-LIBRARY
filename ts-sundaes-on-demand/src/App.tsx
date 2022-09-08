import { OrderDetailsProvider } from 'contexts/OrderDetails';
import OrderConfirmation from 'pages/confirmation/OrderConfirmation';
import OrderEntry from 'pages/entry/OrderEntry';
import OrderSummary from 'pages/summary/OrderSummary';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';

export default function App() {
	// orderPhase needs to be 'inProgress', 'review' or 'completed'
	const [orderPhase, setOrderPhase] = useState<
		'inProgress' | 'review' | 'completed'
	>('inProgress');

	let Component = OrderEntry; // default to order page
	switch (orderPhase) {
		case 'inProgress':
			Component = OrderEntry;
			break;
		case 'review':
			Component = OrderSummary;
			break;
		case 'completed':
			Component = OrderConfirmation;
			break;
		default:
	}

	return (
		<OrderDetailsProvider>
			<Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
		</OrderDetailsProvider>
	);
}
