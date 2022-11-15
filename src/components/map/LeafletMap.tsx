import { Dispatch, SetStateAction } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Position } from "../../models/position";
import CustomMarker from "./CustomMarker";
import LocationButton from "./LocationButton";

type LeafletMapProps<TEditable = boolean> = TEditable extends true
  ? {
      id: string;
      position: Position;
      onGetPositionHandler: Dispatch<SetStateAction<Position>>;
      editable: TEditable;
      popupText?: string;
    }
  : {
      id: string;
      position: Position;
      onGetPositionHandler?: Dispatch<SetStateAction<Position>>;
      editable: TEditable;
      popupText: string;
    };

const LeafletMap = ({
  position,
  onGetPositionHandler,
  editable,
  popupText,
}: LeafletMapProps) => {
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
      <CustomMarker
        draggable={editable}
        position={position}
        onGetPositionHandler={onGetPositionHandler}
        popupText={popupText}
      />
      {editable && <LocationButton onGetPosition={onGetPositionHandler} />}
    </MapContainer>
  );
};

export default LeafletMap;
