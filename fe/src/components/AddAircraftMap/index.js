import React from 'react';
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  Polygon,
  Marker,
  Tooltip,
  Polyline
} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

const icon = new L.DivIcon({
  html: `
  <svg
    width="24"
    height="40"
    viewBox="0 0 100 100"
    version="1.1"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
    style="transform:rotate(180deg)"
  >
    <path d="M0 0 L50 100 L100 0 Z" fill="red"></path>
  </svg>`,
  iconSize: [35, 35],
  className: 'leaflet-div-icon'
});

export const AddAircraftMap = ({
  onCreate,
  onEdit,
  data,
  currLatLng,
  currPolygone,
  currPolyline
}) => {
  return (
    <MapContainer
      center={[
        currLatLng?.lat || data?.latitude || 45.0,
        currLatLng?.lng || data?.longitude || 34.0
      ]}
      zoom={5}
      cli
      maxZoom={11}
      minZoom={5}
      style={{
        width: '100%',
        height: '700px'
      }}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url={`${process.env.PUBLIC_URL}/{z}/{x}/{y}.png`}
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FeatureGroup>
        <EditControl
          position="topright"
          onEditMove={(e) => {
            onEdit(e.layer._latlng || e.layer._latlngs);
          }}
          onCreated={(e) => {
            onCreate(e.layer._latlng || e.layer._latlngs);
          }}
          edit={{
            remove: false
          }}
          draw={{
            rectangle: false,
            circle: false,
            circlemarker: false,
            marker: { icon },
            polyline:
              currPolyline?.length || currPolygone?.length
                ? false
                : {
                    shapeOptions: {
                      color: 'red',
                      stroke: true,
                      fill: false,
                      dashArray: [10, 20],
                      dashOffset: 10,
                      opacity: 1
                    }
                  },
            polygon:
              currPolygone?.length || currPolyline?.length
                ? false
                : {
                    showArea: false,
                    shapeOptions: {
                      color: 'red',
                      stroke: true,
                      fill: false,
                      dashArray: [10, 20],
                      dashOffset: 10,
                      opacity: 1
                    }
                  }
          }}
        />

        {(data && Object.keys(data).length) || (currLatLng?.lat && currLatLng?.lng) ? (
          <>
            {(currLatLng.lat || data.latitude) && (currLatLng.lng || data.longitude) ? (
              <Marker
                position={[currLatLng.lat || data.latitude, currLatLng.lng || data.longitude]}
                icon={icon}>
                <Tooltip permanent={true} direction="right" offset={{ x: 5, y: 0 }}>
                  {data?.data && (
                    <strong>
                      {Object.values(data.data)
                        .flat()
                        .map(({ label }) => label)
                        .join(' / ')}
                    </strong>
                  )}
                </Tooltip>
              </Marker>
            ) : null}

            {data?.polyline ? (
              <Polyline
                pathOptions={{
                  color: 'red',
                  dashArray: [5, 10],
                  fill: false
                }}
                positions={data.polyline.map(({ lat, lng }) => {
                  return [lat, lng];
                })}
              />
            ) : null}
            {!currPolygone?.[0]?.length && data?.polygone?.[0] ? (
              <Polygon
                pathOptions={{
                  color: 'red',
                  dashArray: [5, 10],
                  fill: false
                }}
                positions={data?.polygone[0].map(({ lat, lng }) => {
                  return [lat, lng];
                })}
              />
            ) : null}
            {currPolygone?.[0]?.length ? (
              <Polygon
                pathOptions={{
                  color: 'red',
                  dashArray: [5, 10],
                  fill: true
                }}
                positions={currPolygone[0].map(({ lat, lng }) => {
                  return [lat, lng];
                })}
              />
            ) : null}
          </>
        ) : null}
      </FeatureGroup>
    </MapContainer>
  );
};
