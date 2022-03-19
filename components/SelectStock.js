// import 'bootstrap/dist/css/bootstrap.min.css';
// import {Card, Button, Row, Container, Col} from 'react-bootstrap';

import Select from 'react-select'

import { useState } from 'react';
import dynamic from "next/dynamic";
 


// const CoinPriceChart = dynamic(() => import("../components/charts/CoinPriceChart"), {
//     ssr: false
//   });

// const MyChart = dynamic(() => import("../components/charts/MyChart"), {
// ssr: false
// });

// const PlotlyChart = dynamic(() => import('../components/charts/PlotlyChart'), {
//     ssr: false
// })

const DataChart = dynamic(() => import('../components/charts/DataChart'), {
    ssr: false
})

const PieChart = dynamic(() => import('../components/charts/PieChart'), {
    ssr: false
})



const optionToppings = [
    { value: 'HPG', label: 'HPG - Hoa Phat' },
    { value: 'VCB', label: 'VCB - Vietcombank' },
    { value: 'VIC', label: 'VIC - Vingroup' },
    { value: 'FPT', label: 'FPT - cty FPT' }
  ]

  const optionRiskTypes = [
    { value: 'MKW_MS', label: 'Markowitz Optimizer' },
    { value: 'risk-parity', label: 'risk-parity' },
    { value: 'MKW_MV', label: 'min variance' }
  ]

  


function SelectStock({ data, drawChart }) {
    const [toppings, setToppings] = useState([optionToppings[2], optionToppings[3]]);
    const [riskTypes, setRiskTypes] = useState(optionRiskTypes[0]);
    const [stockPrice, setStockPrice] = useState({});
    const [weight, setWeight] = useState({'FPT':0.5, 'VIC':0.5});
    const [metric, setMetric] = useState();

    function drawChart(){
        // setToppings(toppings);
        
        console.log(toppings.map(stock_list => stock_list.value));
        console.log(toppings.map(stock_list => stock_list.value).join(" ") );
        console.log("(" + toppings.map(stock_list => stock_list.value).toString() + ")");
        console.log(riskTypes.value);
        const ticker_str = toppings.map(stock_list => stock_list.value).join(" ")
        
        
        fetch('https://faststock.herokuapp.com/items', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"tickers_input": ticker_str, "allocation_type": riskTypes.value } )
        })
        .then(response => response.json())
        .then(data => {
            console.log('submited:', data);
            
            setStockPrice(data["df_json"]);
            setWeight(data["weight"]);
           
            
            const desc = document.getElementById("cron descriptor");
            // desc.innerHTML = `${data.map(stock_list => stock_list.value)}`
            desc.innerHTML = `${data['Date']}`
        })
        .catch((error) => {
            console.error('Error:', error);
        });
      
    
    }
    if (stockPrice) {
    return (
        <div>
            <div id="cron descriptor"></div>
            
                <Select
                    defaultValue={[optionToppings[2], optionToppings[3]]}
                    isMulti
                    onChange={setToppings}
                    name="stocks"
                    options={optionToppings}
                    className="basic-multi-select mb-3"
                    classNamePrefix="select"
                />
                <Select
                    defaultValue={optionRiskTypes[0]}             
                    onChange={setRiskTypes}
                    name="risks"
                    options={optionRiskTypes}
                    className="basic-multi-select mb-3"
                    classNamePrefix="select"
                />

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  onClick={() => drawChart()}>Get info</button>
               
            {/* <PlotlyChart /> */}
                
            <div className="grid grid-cols-2 gap-4">
                <div><h4>Annual volatility: {}</h4>
                            <h4>Expected annual return: {2.7451139000718547}</h4>
                            <h4>Sharpe Ratio: {7.630819321050874}</h4>
                </div>
                <div>  <DataChart df_api={stockPrice}  /></div>
            </div>    
               
            <div><PieChart weigh_api={weight} /></div>
                
                
           
           
            <br></br>
                  
                            
                      
                            
                       
                    
               

            
        </div>
    );
    } // end if
}
export default SelectStock;