import axios from 'axios';
import { pricePerItem } from 'constants/index';
import type { OptionCountsTypes } from 'contexts/OrderDetails';
import { useOrderDetails } from 'contexts/OrderDetails';
import AlertBanner from 'pages/common/AlertBanner';
import ScoopOption from 'pages/entry/ScoopOption';
import ToppingOption from 'pages/entry/ToppingOption';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import { formatCurrency } from 'utilities';

export default function Options({
	optionType,
}: {
	optionType: keyof OptionCountsTypes;
}) {
	const [items, setItems] = useState<
		{
			name: string;
			imagePath: string;
		}[]
	>([]);
	const [error, setError] = useState(false);
	const [orderDetails, updateItemCount] = useOrderDetails();

	// optionType is 'scoops' or 'toppings'
	useEffect(() => {
		axios
			.get(`http://localhost:3030/${optionType}`)
			.then((response) => setItems(response.data))
			.catch(() => setError(true));
	}, [optionType]);

	if (error) {
		return <AlertBanner />;
	}

	const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
	const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

	const optionItems = items.map((item) => (
		<ItemComponent
			key={item.name}
			name={item.name}
			imagePath={item.imagePath}
			updateItemCount={(itemName, newItemCount) =>
				updateItemCount(itemName, newItemCount, optionType)
			}
		/>
	));

	return (
		<>
			<h2>{title}</h2>
			<p>{formatCurrency(pricePerItem[optionType])} each</p>
			<p>
				{title} total: {orderDetails.totals[optionType]}
			</p>
			<Row>{optionItems}</Row>
		</>
	);
}
