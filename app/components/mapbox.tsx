'use client'

import * as React from "react";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import data from  "../common/data.json";
import poly from  "../common/poly.json";

function MapboxMap() {
    const [map, setMap] = React.useState<mapboxgl.Map>();

    const mapNode = React.useRef(null);


    const startPoint = data.geometry.coordinates[0] as [number, number];
    const lastPoint = data.geometry.coordinates[data.geometry.coordinates.length - 1] as [number, number];


    React.useEffect(() => {
        const node = mapNode.current;
        if (typeof window === "undefined" || node === null) return;
        console.log('token', process.env.NEXT_PUBLIC_MAPBOX_TOKEN);
        const mapboxMap = new mapboxgl.Map({
            container: node,
            accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
            style: "mapbox://styles/mapbox/streets-v11",
            center: startPoint as (LngLatLike | undefined),
            zoom: 9,
        });


        setMap(mapboxMap);

        mapboxMap.once('load', () => {
            mapboxMap.addSource('route', {
                type: 'geojson',
                data: data as unknown as string,
            });
            mapboxMap.addLayer({
                id: 'route',
                type: 'line',
                source: 'route',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#888',
                    'line-width': 8
                }
            });


            mapboxMap.addSource('maine', {
                type: 'geojson',
                data: poly as unknown as string
            });

            mapboxMap.addLayer({
                id: 'maine',
                type: 'fill',
                source: 'maine',
                layout: {},
                paint: {
                    'fill-color': '#0080ff',
                    'fill-opacity': 0.5
                }
            });

            mapboxMap.addLayer({
                id: 'outline',
                type: 'line',
                source: 'maine',
                layout: {},
                paint: {
                    'line-color': '#000',
                    'line-width': 3
                }
            });
        });


        new mapboxgl.Marker().setLngLat(startPoint).addTo(mapboxMap);
        new mapboxgl.Marker().setLngLat(lastPoint).addTo(mapboxMap);

        mapboxMap.addControl(new mapboxgl.NavigationControl(), "top-right");

        return () => {
            mapboxMap.remove();
        };
    }, []);

    return <div ref={mapNode} style={{ width: "100%", height: "100%" }} />;
}

export default MapboxMap
