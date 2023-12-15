import axios from 'axios';
import { shipTypes } from '../constants';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 12000
});

const normalizeInitResponse = ({
  units: unitNames,
  persons_who_added: personsWhoAdded,
  call_signs: callSigns,
  ships: shipNames
}) => {
  return {
    unitNames: unitNames.map(({ unit_id: unitId, unit_name: unitName }) => ({ unitId, unitName })),
    personsWhoAdded,
    callSigns,
    shipNames
  };
};

const normalizePostShipDataResponse = ({
  persons_who_added: personsWhoAdded,
  call_signs: callSigns,
  ships: shipNames,
  latitude,
  longitude,
  id: dataId,
  personEditName,
  data
}) => {
  return {
    personsWhoAdded,
    callSigns,
    shipNames,
    latitude,
    longitude,
    dataId,
    personEditName,
    data
  };
};

const normalizePostUnitResponse = (data) => {
  return data.map(({ unit_id: unitId, unit_name: unitName }) => ({ unitId, unitName }));
};

const normalizeSearchShipKeyword = (data) => {
  return data.map(({ ship_id: shipId, ship_name: shipName, ship_type: shipType }) => ({
    shipId,
    shipName,
    shipType
  }));
};

export async function apiGetInit() {
  const { data } = await api.get('/dictionary');
  return normalizeInitResponse(data);
}

export async function apiPostUnit(body) {
  const { data } = await api.post('/unit', body);
  return normalizePostUnitResponse(data);
}

export async function apiPostShip(body) {
  await api.post('/ship', body);
}

export async function apiPostSearchShipKeyword(body) {
  const { data } = await api.post('/ship/search', body);
  return normalizeSearchShipKeyword(data);
}

export async function apiPostShipData(body) {
  const { data } = await api.post('/ship/add-data', body);
  return normalizePostShipDataResponse(data);
}

export async function apiEditShipData(body) {
  const { data } = await api.put('/ship/edit-data', body);
  return normalizePostShipDataResponse(data);
}

const normalizeFilterResponse = (data) => {
  if (!data) return [];
  return data.map(
    ({
      additional_information: additionalInformation,
      companion_callsign: companionCallsign,
      create_timestamp_utc: createTimestamp,
      data_id: dataId,
      discover_timestamp_utc: discoverTimestamp,
      edit_timestamp: editTimestamp,
      frequency,
      latitude,
      longitude,
      peleng,
      person_who_added: personsWhoAdded,
      person_who_edited: personWhoEdited,
      ship_callsign: shipCallsign,
      ship,
      unknownData
    }) => ({
      additionalInformation,
      companionCallsign,
      createTimestamp,
      dataId,
      discoverTimestamp,
      editTimestamp,
      frequency,
      latitude,
      longitude,
      peleng,
      personsWhoAdded,
      personWhoEdited,
      shipCallsign,
      shipId:
        ship?.ship_id ||
        JSON.parse(unknownData)
          ?.map(({ shipName, type }) => `${shipTypes[type]?.short} ${shipName}`)
          .join(' / '),
      shipBortNumber: ship?.ship_bort_number,
      shipCity: ship?.ship_city,
      shipName:
        ship?.ship_name && ship?.ship_type
          ? `${shipTypes[ship.ship_type]?.short} ${ship.ship_name}`
          : JSON.parse(unknownData)
              ?.map(({ shipName, type }) => `${shipTypes[type]?.short} ${shipName}`)
              .join(' / '),
      shipProject: ship?.ship_project,
      shipType: ship?.ship_type
    })
  );
};

export async function apiFilterShipsData(body) {
  const { data } = await api.post('/ship/filter', body);
  return normalizeFilterResponse(data);
}

export async function deleteShipData(id) {
  await api.delete(`/ship/delete/ship-data/${id}`);
}

export async function getShipInfoById(id) {
  const { data } = await api.get(`/ship/info/${id}`);
  return data;
}
