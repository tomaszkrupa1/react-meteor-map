import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import { useEffect, useState} from "react";



export const Map = () => {

const [meteors, setMeteors] = useState([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {

  fetch('https://data.nasa.gov/resource/gh4g-9sfh.json')
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    setMeteors(data)
    setIsLoading(false)
  })
}, []);

if (isLoading) {
  return <div> IS LOADING</div>
} else {
  


    return (<div className="map">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={1}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[meteors[0].reclat,meteors[0].reclong]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41]})} > 
          
          
            <Popup>
              Name: {meteors[0].name} <br /> Mass: {meteors[0].mass}g
            </Popup>
          </Marker>
        </MapContainer>
      </div>)
}

}