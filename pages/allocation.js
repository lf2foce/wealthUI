/* This example requires Tailwind CSS v2.0+ */
import { LockClosedIcon } from '@heroicons/react/solid'
import Select from 'react-select'
import { useState } from 'react';
import dynamic from "next/dynamic";
import { sample } from "lodash";

const MyResponsiveBar = dynamic(() => import('../components/charts/Nivo/Bar'), {
  ssr: false
})

const MyResponsiveLine = dynamic(() => import('../components/charts/Nivo/Line'), {
  ssr: false
})

const MyResponsivePie = dynamic(() => import('../components/charts/Nivo/Pie'), {
  ssr: false
})

import nivoData from "./api/data"

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

  const nivoPieColor = ["hsl(11, 70%, 50%)", "hsl(258, 70%, 50%)", "hsl(330, 70%, 50%)", "hsl(106, 70%, 50%)", "hsl(35, 70%, 50%)"]



export default function Example() {

  const [toppings, setToppings] = useState([optionToppings[2], optionToppings[3]]);
  const [riskTypes, setRiskTypes] = useState(optionRiskTypes[0]);
  const [stockPrice, setStockPrice] = useState({});
  const [weight, setWeight] = useState([
    {   "id":  "VIC",
        "label": "VIC",
        "value": 0.5,
        "color": sample(nivoPieColor)
    },
    {   "id": "FPT",
        "label": "FPT",
        "value": 0.5,
        "color":  sample(nivoPieColor)
    }]
  );

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
        setWeight(data["weights"]);
       
      
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  

  }

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Factor investing</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-700 sm:text-4xl">
            A better way to allocate money
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Pick stocks </p>
            <div  className="mx-auto mt-4 max-w-2xl">
            <Select
                    defaultValue={[optionToppings[2], optionToppings[3]]}
                    isMulti
                    onChange={setToppings}
                    name="stocks"
                    options={optionToppings}
                    className="basic-multi-select mb-3"
                    classNamePrefix="select"
                    instanceId={'1'}
                   
                />
                <Select
                    defaultValue={optionRiskTypes[0]}             
                    onChange={setRiskTypes}
                    name="risks"
                    options={optionRiskTypes}
                    className="basic-multi-select mb-3"
                    classNamePrefix="select"
                    instanceId={'2d'}
                />
                
              <button
          
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => drawChart()}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Calculate
              </button>
              </div>  
              
        </div>
                  
     
        


      

        <div className="mt-10 ">
          <div className="grid grid-cols-3 gap-4 justify-items-center">
            <div >
              <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Sharpe ratio</div>
              <div className="flex items-start">
                <div className="text-3xl font-bold text-slate-800 mr-2">2.4</div>
                <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full"></div>
              </div>
            </div>

          <div>  
            <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Expected annual return</div>
            <div className="flex items-start">
              <div className="text-3xl font-bold text-slate-800 mr-2">20%</div>
              <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full"></div>
            </div>
          </div> 

          <div>     
            <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Annual volatility</div>
              <div className="flex items-start">
                <div className="text-3xl font-bold text-slate-800 mr-2">20%</div>
                <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>   

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          <div style={{height: 300}} >
            <MyResponsiveBar data={nivoData['dataBar']} />
          </div>

          <div style={{height: 300}} >
              <MyResponsivePie data={weight} />
          </div>

        </div>
        <div className="grid grid-cols-1">
          <div style={{height: 400}} >
              <MyResponsiveLine data={nivoData['dataLine']} />
          </div>
        </div>
          
        </div>
      </div>
    </div>
  )
}