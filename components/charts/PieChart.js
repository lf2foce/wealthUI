import Plot from 'react-plotly.js';

const PieChart = (props) => {
    const weight_res = props.weigh_api
    
    var data = [{
        values: Object.values(weight_res),
        labels: Object.keys(weight_res),
        type: 'pie'
      }];

    const config = {responsive: true, displayModeBar: false};
    const layout = {
                title: 'Proportion',
                // colorway : [ '008fd5', 'fc4f30', 'e5ae38', '8b8b8b',],
                margin: {
                    // t: 0,
                    // l: 40,
                    // r: 15
                },
                legend: {"orientation": "h"}
                // height: 400,
                // width: 500

            }
    
        
        // var data = [plot1, plot2];
        return(
            <Plot
            data={data}
            layout={ layout } config= { config } />
        )
      
}
export default PieChart 