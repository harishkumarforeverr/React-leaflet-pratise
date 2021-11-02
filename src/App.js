import React, { useState } from "react";
import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import * as parkData from "./mydata.json";
import { Icon } from "leaflet";
import useSWR from "swr";
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl: require('leaflet/dist/images/marker-icon.png').default,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
});
const position = [52.639267, -1.123420];

// const myicon=new Icon({
//   iconUrl:"skateboarding.svg",
//   iconSize:[25,25]
// })
var myIcon = L.icon({
  iconUrl: "skateboarding.svg",
  iconSize: [25, 25]
});
const App = () => {
  const [activepark, setactivepark] = useState(null);
  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const url =
    "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10";

  const { data, error } = useSWR(url, fetcher);
  const crimedata = data && !error ? data.slice(0, 100) : [];
  return (
    <div>
      <MapContainer
        center={position}
        zoom={14}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {crimedata.map((data) => (
          <Marker
            key={data["id"]}
            position={[data.location.latitude, data.location.longitude]}
          >
            <Popup>
              its a popup create by <br /> harishkumarforever
            </Popup>
          </Marker>
        ))}









        {/* // old pratise  start here */}
        {/* {parkData.features.map((park) => {
          return (
            <Marker
              key={park.properties.PARK_ID}
              position={[
                park.geometry.coordinates[1],
                park.geometry.coordinates[0]
              ]}
              // icon={myIcon}
              eventHandlers={{
                click: () => {
                  setactivepark(park);
                },
              }}
            />
          );
        })} */}
        {/* {activepark &&
          <Popup
            onClose={()=>{
              setactivepark(null);
            }}
            position={[
              activepark.geometry.coordinates[1],
              activepark.geometry.coordinates[0]
            ]}>
            <div>
              <h1> {activepark.properties.NAME} </h1>
              <p> {activepark.properties.DESCRIPTIO} </p>
            </div>
          </Popup>
        } */}




      </MapContainer>
    </div>
  );
};
export default App;
