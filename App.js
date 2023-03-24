
// import {useState} from 'react';
import './App.css'
import Coviddata from './Components/Coviddata';
import { useEffect, useState } from 'react'
import Heading from './Components/heading';

function App() {

  const[covid,setCovid]=useState([])
  const [search,setSearch] = useState("")
  const fetchApiData=()=>{
    fetch('https://api.rootnet.in/covid19-in/stats/latest').then(json=>{
      return json.json()
    }).then(data=>{
      // console.log(data)
      setCovid(data.data.regional)
      console.log(covid)
    })
  }
  useEffect(()=>{
    fetchApiData() 
  },[])
  
  return(
    <div className="App">
        <Heading/>
        <div className='search'>
                <input type='text' placeholder='Search by State name...' onChange={(e)=>{setSearch(e.target.value)}} />
        </div>
          {
                covid.filter(val=>{
                    if(search === ""){
                        return val;
                    }else if(val.loc.toLowerCase().includes(search.toLowerCase())){
                        return val;
                    }
                }).map((covd)=>{
          return(
           <Coviddata
           loc={covd.loc}
           confirmedCasesIndian={covd.confirmedCasesIndian}
           discharged={covd.discharged}
           deaths={covd.deaths}
           />
          )
         })
        }
      </div>
  )
}

export default App;
