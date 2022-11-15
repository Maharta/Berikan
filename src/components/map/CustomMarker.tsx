import { Marker as MarkerInstance } from "leaflet";
import { Dispatch, SetStateAction, useEffect, useMemo, useRef } from "react";
import { Marker, Popup } from "react-leaflet";
import { Position } from "../../models/position";

interface CustomMarkerProps {
  draggable: boolean;
  position: Position;
  onGetPositionHandler?: Dispatch<SetStateAction<Position>>;
  popupText?: string;
}

const CustomMarker = ({
  draggable,
  position,
  popupText,
  onGetPositionHandler,
}: CustomMarkerProps) => {
  const markerRef = useRef<MarkerInstance>(null);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markerRef.current]);
  // this is fine since leaflet doesn't rely on re-render to open popup

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null && onGetPositionHandler) {
          onGetPositionHandler(marker.getLatLng());
        }
      },
    }),
    [onGetPositionHandler]
  );
  return (
    <Marker
      eventHandlers={eventHandlers}
      draggable={draggable}
      ref={markerRef}
      position={[position.lat, position.lng]}>
      <Popup>
        {draggable ? (
          <span>
            Geser marker atau klik tombol lokasi <br />
            untuk menentukan posisi barang.
          </span>
        ) : (
          popupText
        )}
      </Popup>
    </Marker>
  );
};

export default CustomMarker;
