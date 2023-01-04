import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import { useEffect, useState} from "react";
import { YearSlider } from "./YearSlider";



export const Map = () => {

const [meteors, setMeteors] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [yearRange, setYearRange] = useState([-Infinity, Infinity])
const [massRange, setMassRange] = useState([-Infinity, Infinity])
let yearMin = 861
let yearMax = 2013

useEffect(() => {
  fetch('https://data.nasa.gov/resource/gh4g-9sfh.json?fall=Fell')
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    const rawData = data.filter((meteor) => {
      return (meteor.geolocation && meteor.year)
  })
    // yearMin = Math.min(...rawData.map((meteor) => {
    //   return parseInt(meteor.year)
    // }))
    
    // yearMax = Math.max(...rawData.map((meteor) => {
    //   return parseInt(meteor.year)
    // }))
    
    setMeteors(rawData)
    setIsLoading(false)
  })
}, []);

if (isLoading) {
  return <div> IS LOADING</div>
} else {
  


    return (<div className="map">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={2}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {meteors.map((meteor) => (<Marker key={meteor.name} position={[meteor.geolocation.latitude, meteor.geolocation.longitude]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41]})} > 
            <Popup>
              Name: {meteor.name} <br /> Mass: {meteor.mass}g <br /> Year: {meteor.year}
            </Popup>
          </Marker>)
          )}
          
        </MapContainer>
        <br></br>
        <YearSlider yearMin={yearMin} yearMax={yearMax} onChange={({ yearMin, yearMax }) => console.log(`min = ${yearMin}, max = ${yearMax}`)}/>
      </div>)
}

}