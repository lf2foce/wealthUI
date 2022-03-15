import {Card, Button} from 'react-bootstrap';
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
            // body: JSON.stringify(date_params),
            body: JSON.stringify({"tickers_input": ticker_str, "allocation_type": riskTypes.value } )
        })
        .then(response => response.json())
        .then(data => {
            console.log('submited:', data);
            setStockPrice(data["df_json"]);
           
            
            const desc = document.getElementById("cron descriptor");
            // desc.innerHTML = `${data.map(stock_list => stock_list.value)}`
            desc.innerHTML = `${data['Date']}`
        })
        .catch((error) => {
            console.error('Error:', error);
        });
      
    
    }
    return (
        <div>
            <div id="cron descriptor"></div>
            <Card>

            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            {/* <CoinPriceChart width={500} height={300} /> */}
            {/* <MyChart /> */}
            
            

            <Card.Body>
                <Card.Title>Dashboard</Card.Title>
                <Card.Text>
                chart here
                
                </Card.Text>
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

                <Button variant="primary" onClick={() => drawChart()}>Get info</Button>
            </Card.Body>
            {/* <PlotlyChart /> */}
            <DataChart df_api={stockPrice} />
            </Card>

            
        </div>
    );
}
export default SelectStock;