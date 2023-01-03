import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import { useEffect, useState} from "react";



export const Map = () => {

const [meteors, setMeteors] = useState([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {

  fetch('https://data.nasa.gov/resource/gh4g-9sfh.json?$order=year%20desc&fall=Fell')
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    setMeteors(data.filter((meteor) => {
        return (meteor.geolocation)
    }))
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
      </div>)
}

}