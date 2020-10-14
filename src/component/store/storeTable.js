import React from 'react';
import MaterialTable from 'material-table';

export default function storeTable() {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [ state, setState ] = React.useState({
		columns : [
			{ title: 'OrgID', field: 'orgid' },
			{ title: 'OrgName', field: 'orgname' },
			{ title: 'OrgLocation', field: 'orglocation' },
			{ title: 'OrgPhone', field: 'orgphone' },
			{ title: 'OrgEmployees', field: 'orgemployees' }
			]

	});

	return (
    <MaterialTable
			title=""
			columns={ state.columns }
			data={ this.props.data }
			editable={ {
				onRowAdd : (newData) =>
					new Promise((resolve) => {
						setTimeout(() => {
							resolve();
							setState((prevState) => {
								const data = [ ...prevState.data ];
								data.push(newData);
								return { ...prevState, data };
							});
						}, 600);
					}),
				onRowUpdate : (newData, oldData) =>
					new Promise((resolve) => {
						setTimeout(() => {
							resolve();
							if (oldData) {
								setState((prevState) => {
									const data = [ ...prevState.data ];
									data[ data.indexOf(oldData) ] = newData;
									return { ...prevState, data };
								});
							}
						}, 600);
					}),
				onRowDelete : (oldData) =>
					new Promise((resolve) => {
						setTimeout(() => {
							resolve();
							setState((prevState) => {
								const data = [ ...prevState.data ];
								data.splice(data.indexOf(oldData), 1);
								return { ...prevState, data };
							});
						}, 600);
					})
			} }
		/>
	);
}