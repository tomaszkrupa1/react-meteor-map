import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import { useEffect, useState} from "react";
import { YearSlider } from "./YearSlider";
import {MassSlider} from "./MassSlider"



export const Map = () => {

const [meteors, setMeteors] = useState([]);
const [isLoading, setIsLoading] = useState(true);
let yearMin = 861
let yearMax = 2013
let massMin = 0
let massMax = 230000
const [minMass, setMinMass] = useState(massMin)
const [maxMass, setMaxMass] = useState(massMax)
const [minYear, setMinYear] = useState(yearMin);
const [maxYear, setMaxYear] = useState(yearMax);

useEffect(() => {
  fetch('https://data.nasa.gov/resource/gh4g-9sfh.json')
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    const rawData = data.filter((meteor) => {
      return (meteor.geolocation)
  })
  console.log(parseFloat(rawData[0].mass))
  console.log(minMass + ' min Mass')
  console.log(maxMass + ' max Mass')
    const filterData = rawData.filter((meteor) => {
      return ((parseInt(meteor.year) >= minYear) 
      && (parseInt(meteor.year) <= maxYear) 
      && (parseFloat(meteor.mass) >= minMass) 
      && (parseFloat(meteor.mass) <= maxMass)
      )
    })
    setMeteors(filterData)
    setIsLoading(false)
  })
}, [minYear, maxYear, minMass, maxMass]);

if (isLoading) {
  return <div> IS LOADING</div>
} else {
    return (<div className="map grid">
        <MapContainer
          id="map"
          center={[15,20]}
          zoom={2}
          minZoom={2}
          scrollWheelZoom={true}
          maxBounds={([[-80, -180],[80,180]])}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {meteors.map((meteor) => (<Marker key={meteor.name} position={[meteor.geolocation.latitude, meteor.geolocation.longitude]} icon={new Icon({iconUrl: markerIconPng, iconSize: [18, 30]})} > 
            <Popup>
              Name: {meteor.name} <br /> Mass: {meteor.mass}g <br /> Year: {parseInt(meteor.year)}
            </Popup>
          </Marker>)
          )}
          
        </MapContainer>
        <h3>Year</h3>
        <YearSlider id="YearSlider" yearMin={yearMin} minVal={minYear} setMinVal={setMinYear} yearMax={yearMax} maxVal={maxYear} setMaxVal={setMaxYear} />
        <h3>Mass (g)</h3>
        <MassSlider id="MassSlider" massMin={massMin} minVal={minMass} setMinVal={setMinMass} massMax={massMax} maxVal={maxMass} setMaxVal={setMaxMass} />
      </div>)
}

}