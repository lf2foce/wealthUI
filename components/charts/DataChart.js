// function NumberList(props) {
//     const numbers = props.numbers;
//     const listItems = numbers.map((number) =>
//       <li>{number}</li>
//     );
//     return (
//       <ul>{listItems}</ul>
//     );
//   }
  
//   const numbers = [1, 2, 3, 4, 5];
//   ReactDOM.render(
//     <NumberList numbers={numbers} />,
//     document.getElementById('root')
//   );

import Plot from 'react-plotly.js';

const DataChart = (props) => {

    const res = props.df_api

    
    // var plot1 = {
    //     x: res['date'],
    //     y:  res['FPT'],
    //     name: "FPT",
    //     type: "line",
    // };
  
    // var plot2 = {
    //     x: res['date'],
    //     y: res['VIC'],
    //     name: "VIC",
    //     type: "line",
    // };

    var data = []
        for (var key in res) {
            var timeArr = []
            res[key]['date'].forEach(item => {
                timeArr.push(item.replace('T', ' '));
            });
            //console.log(timeArr);
            data.push({
                x: timeArr,
                y: res[key]['price'],
                line: {
                shape: 'spline', 
                width: 2
                },
                type: 'scatter',
                name: key,
                mode: 'lines'
            });
        }

    // const layout = {width: 500, height: 500, title: 'Electronics Prices 2016/2017'}
    const config = {responsive: true};
    const layout = {
                title: 'Strategies Backtest',
                // colorway : [ '008fd5', 'fc4f30', 'e5ae38', '8b8b8b',],
                margin: {
                    t: 50,
                    l: 40,
                    r: 5
                },
                legend: {"orientation": "h"},
                xaxis: {
                    title: ' ', 
                    showgrid: false, 
                    autorange: true, 
                    tickformat: ''
                }, 
                yaxis: {
                    type: 'linear', 
                    title: ' ', 
                    autorange: true, 
                    gridcolor: 'rgb(208, 208, 208)', 
                    ticksuffix: '  '
                } , 
                // plot_bgcolor: 'rgb(242, 242, 242)', 
                // paper_bgcolor: 'rgb(242, 242, 242)'

            }
    
        // var data = [plot1, plot2];
        return(
            <Plot
            data={data}
            layout={ layout } config= { config } />
        )
      
}
export default DataChart 


// var res =  result["df_api"]["compare_method"]
          
//             var data = []
//             for (var key in res) {
//               var timeArr = []
//               res[key]['date'].forEach(item => {
//                 timeArr.push(item.replace('T', ' '));
//               });
//               //console.log(timeArr);
//               data.push({
//                 x: timeArr,
//                 y: res[key]['price'],
//                 line: {
//                   shape: 'spline', 
//                   width: 2
//                 },
//                 type: 'scatter',
//                 name: key,
//                 mode: 'lines'
//               });
//             }
//             //}) //end Object loop
      
//             var layout = {
//               title: 'Strategies Backtest',
//               colorway : [ '008fd5', 'fc4f30', 'e5ae38', '8b8b8b',],
//               margin: {
//                 t: 40,
//                 l: 30,
//                 r: 5
//               },
//               legend: {"orientation": "h"},
//               xaxis: {
//                 title: ' ', 
//                 showgrid: false, 
//                 autorange: true, 
//                 tickformat: ''
//               }, 
//               yaxis: {
//                 type: 'linear', 
//                 title: ' ', 
//                 autorange: true, 
//                 gridcolor: 'rgb(208, 208, 208)', 
//                 ticksuffix: '  '
//               }
      
//               // plot_bgcolor: 'rgb(242, 242, 242)', 
//               // paper_bgcolor: 'rgb(242, 242, 242)'

         
//             }
//             var config = {responsive: true};
      
//             Plotly.newPlot('myDiv', data, layout, config);