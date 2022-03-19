// import MyResponsiveBar from "../components/charts/Nivo/Bar"
// import MyResponsiveSunburst from "../components/charts/Nivo/Sunburst"
// import MyResponsiveLine from "../components/charts/Nivo/Line"
// import MyResponsivePie from "../components/charts/Nivo/Pie"

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

import { sample } from "lodash";

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from "next/dynamic";

// const MyResponsiveBar = dynamic(() => import("../components/charts/Nivo/Bar"), {
//     ssr: false
// })



export default function Home() {
    
  return (
    <>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  


        <div style={{height: 300}} >
        <MyResponsiveBar data={nivoData['dataBar']} />
        </div>

        {/* <div style={{height: 300}} >
            <MyResponsiveSunburst data={nivoData['dataSun']} />
        </div> */}

        <div style={{height: 300}} >
            <MyResponsivePie data={nivoData['dataPie']} />
        </div>

        

    </div>
    <div className="grid grid-cols-1">
    <div style={{height: 400}} >
            <MyResponsiveLine data={nivoData['dataLine']} />
        </div>
    </div>
    </>
  )
}
