import { Dispatch, SetStateAction, useEffect, useMemo, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Position } from "../../models/position";
import LocationButton from "./LocationButton";

interface LeafletMapProps {
  id: string;
  position: Position;
  onGetPositionHandler: Dispatch<SetStateAction<Position>>;
}

const LeafletMap = ({ position, onGetPositionHandler }: LeafletMapProps) => {
  const markerRef = useRef<any>(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          onGetPositionHandler(marker.getLatLng());
        }
      },
    }),
    [onGetPositionHandler]
  );

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markerRef.current]);
  // this is fine since leaflet doesn't rely on re-render to open popup

  return (
    <MapContainer
      id="map"
      className="mx-auto h-44 w-full"
      center={[position.lat, position.lng]}
      zoom={13}
      scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        eventHandlers={eventHandlers}
        draggable={true}
        ref={markerRef}
        position={[position.lat, position.lng]}>
        <Popup>
          Geser marker atau klik tombol lokasi <br />
          untuk menentukan posisi barang.
        </Popup>
      </Marker>
      <LocationButton onGetPosition={onGetPositionHandler} />
    </MapContainer>
  );
};

export default LeafletMap;
