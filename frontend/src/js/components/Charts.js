import React from 'react'
import { Chart } from 'react-google-charts';


export default class Charts extends React.Component{
    constructor(props) {
        super();
        const {users} = props;

        const barChartFilteredData = users.filter((user) => {
            return user.count > 2000;
        });

        const barChartData = barChartFilteredData.map((user) => {
            return [user.country, user.count]
        });

        const pieChartData = users.map((user) => {
            return [user.country, user.count]
        });

        barChartData.unshift(['Country', 'Users']);
        pieChartData.unshift(['Country', 'Users']);

        this.state = {
            barChartOptions: {
                title: 'Top Countries by Users',
                //vAxis: {title: 'Year', titleTextStyle: {color: 'red'}},
                //  legend: 'none',
            },
            pieChartOptions: {
                title: 'Users by Coutry',
                sliceVisibilityThreshold: 1/1000
                //  legend: 'none',
            },
            pieChartData: pieChartData,
            barChartData: barChartData
        };
    }
    render() {
        //console.log(pieChartData);

        return (
            <div>
                <Chart
                    chartType="PieChart"
                    data={this.state.pieChartData}
                    options={this.state.pieChartOptions}
                    graph_id="PieChart"
                    width="50%"
                    height="200px"
                    legend_toggle
                    />
                <Chart
                    chartType="BarChart"
                    data={this.state.barChartData}
                    options={this.state.barChartOptions}
                    graph_id="BarChart"
                    width="70%"
                    height="300px"
                    legend_toggle
                    />
            </div>

        );
    }
}