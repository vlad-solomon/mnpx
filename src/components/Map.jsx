import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

export default function Map({ lat, long }) {
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);

    useEffect(() => {
        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: [long, lat],
            zoom: 12.5,
        });

        return () => {
            mapRef.current.remove();
        };
    }, [lat, long]);

    return (
        <div
            ref={mapContainerRef}
            id="map-container"
            className="h-full w-full absolute bg-stone-900 top-0 left-0"
        ></div>
    );
}
