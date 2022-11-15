import L from "leaflet";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import { Position } from "../../models/position";

interface LocationButtonProps {
  onGetPosition?: Dispatch<SetStateAction<Position>>;
}

const LocationButton = ({ onGetPosition }: LocationButtonProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    const button = L.easyButton(
      `<div class="location-icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      </div>
     `,
      () => {
        map.locate().on("locationfound", function (e) {
          map.flyTo(e.latlng, map.getZoom());
          if (onGetPosition) {
            onGetPosition(e.latlng);
          }
        });
      }
    )
      .setPosition("bottomright")
      .addTo(map);

    return () => {
      map.removeControl(button);
    };
  }, [map, onGetPosition]);

  return null;
};

export default LocationButton;
