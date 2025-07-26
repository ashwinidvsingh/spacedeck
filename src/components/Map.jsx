import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Map({center}) {
  let [longitude, latitude] = center;

  return (
    <MapContainer center={[longitude, latitude]} zoom={5} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={[longitude, latitude]}>
        <Popup>
          New Delhi spotted!
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map
