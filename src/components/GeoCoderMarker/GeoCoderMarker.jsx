import { useEffect, useState } from "react";
import { useMap, Marker, Popup } from "react-leaflet";
import * as ELG from "esri-leaflet-geocoder";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

function GeoCoderMarker({ address }) {
  const map = useMap();
  const [position, setPosition] = useState([50.447, 30.517]);

  useEffect(() => {
    ELG.geocode({
      apikey: `${process.env.REACT_APP_ARCGIS}`,
    })
      .text(address)
      .run((err, results, response) => {
        if (results?.results?.length > 0) {
          const { lat, lng } = results?.results[0].latlng;
          setPosition([lat, lng]);
          map.flyTo([lat, lng], 10);
        }
      });
  }, [address, map]);

  return (
    <Marker position={position} icon={DefaultIcon}>
      <Popup>{address}</Popup>
    </Marker>
  );
}

export default GeoCoderMarker;
