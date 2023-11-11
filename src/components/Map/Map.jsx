import { MapContainer, TileLayer } from "react-leaflet";
import GeoCoderMarker from "../GeoCoderMarker/GeoCoderMarker";
import "./Map.css";

function Map({ address, city }) {
  return (
    <MapContainer center={[48, 30]} zoom={5} scrollWheelZoom={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoCoderMarker address={`${address} ${city}`} />
    </MapContainer>
  );
}

export default Map;
