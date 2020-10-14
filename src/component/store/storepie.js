import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
	Chart,
	PieSeries,
	Title
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';
import Navbar from '../navbar';
import Container from '@material-ui/core/Container';

const data = [
	{ country: 'Inventory1', area: 12 },
	{ country: 'Inventory2', area: 7 },
	{ country: 'Inventory3', area: 7 },
	{ country: 'Inventory4', area: 7 },
	{ country: 'Inventory5', area: 6 },
	{ country: 'Inventory6', area: 5 },
	{ country: 'Inventory7', area: 2 },
	{ country: 'Inventory8', area: 55 }
];
export default class storepie extends React.PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			data
		};
	}

	render() {

		const { data: chartData } = this.state;

		return (
    <div>
        <Navbar/>
        <div className={ 'top-5pres' }>
            <Container fixed>
                <Paper>
                    <Chart
					data={ chartData }
				>
                        <PieSeries
						valueField="area"
						argumentField="country"
					/>
                        <Title
						text="Last week"
					/>
                        <Animation />
                    </Chart>
                </Paper>
            </Container>
        </div></div>
			
		);
	}
}