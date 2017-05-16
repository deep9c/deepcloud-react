var React = require('react');
var styles = require('../styles/styles');
var PropTypes = React.PropTypes;
var styles = require('../styles/styles');
var FixedDataTable = require('fixed-data-table');
var generalUtils = require('../utils/GeneralUtils.js');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

const {Table, Column, Cell} = FixedDataTable;

function JobsListComponent(props) {
	var jobsList = props.jobsList;
	console.log(jobsList);

	const JobIDCell = ({rowIndex, data, col}) => (
		<Cell>
			<Link to={{
				pathname: "/dashboard/jobDetails",
				query: {
					jobId: jobsList[rowIndex][col],
					procId: jobsList[rowIndex]["pid"]
				}}
			}>
				{jobsList[rowIndex][col]}
			</Link>
		</Cell>
	);

	const JobTypeCell = ({rowIndex, data, col}) => (
		<Cell>
			{generalUtils.capitalizeFirstLetter(jobsList[rowIndex][col])}
		</Cell>
	);

	const JobStatusCell = ({rowIndex, data, col}) => (
		<Cell>
			{generalUtils.capitalizeFirstLetter(jobsList[rowIndex][col])}
		</Cell>
	);

	return(
		<div className="ui container">
			<Table
				rowHeight={50}
				headerHeight={50}
				rowsCount={jobsList.length}
				width={1000}
				height={500}
				>
				<Column
					header={<Cell>Job ID</Cell>}
					cell={<JobIDCell data={jobsList} col="job_id" />}
					flexGrow={2}
					width={50}
				/>
				<Column
					header={<Cell>Job Type</Cell>}
					cell={<JobTypeCell data={jobsList} col="jobtype" />}
					flexGrow={1}
					width={100}
				/>
				<Column
					header={<Cell>Job Status</Cell>}
					cell={<JobStatusCell data={jobsList} col="jobstatus" />}
					flexGrow={1}
					width={100}
				/>
			</Table>
		</div>
	);
}

JobsListComponent.propTypes = {
	jobsList: PropTypes.array.isRequired
};

module.exports = JobsListComponent;
