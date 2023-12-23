import { shipTypes } from '../../../constants';
import { api } from '../../../services/api';

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
        (unknownData &&
          JSON.parse(unknownData)
            .map(({ shipName, type }) => `${shipTypes[type]?.short} ${shipName}`)
            .join(' / ')),
      shipBortNumber: ship?.ship_bort_number,
      shipCity: ship?.ship_city,
      shipName:
        ship?.ship_name && ship?.ship_type
          ? `${shipTypes[ship.ship_type]?.short} ${ship.ship_name}`
          : unknownData
          ? JSON.parse(unknownData)
              .map(({ shipName, type }) => `${shipTypes[type]?.short} ${shipName}`)
              .join(' / ')
          : '',
      shipProject: ship?.ship_project,
      shipType: ship?.ship_type
    })
  );
};

// shipId: string;
// discoverTimestamp: number;
// personName: string;
// frequency: string;
// latitude: number;
// longitude: number;
// peleng: number;
// additionalInformation: string;
// shipCallsign: string;
// companionCallsign: string;
// data: "[{\"shipId\":\"\",\"shipName\":\"\",\"type\":\"btsch\"},{\"shipId\":\"\",\"shipName\":\"\",\"type\":\"gos\"}]";
const postShipData = async (body) => {
  const { data } = await api.post('/ship/add-data', body);
  return normalizePostShipDataResponse(data);
};
const editShipData = async (body) => {
  const { data } = await api.put('/ship/edit-data', body);
  return normalizePostShipDataResponse(data);
};
const getShipDataById = async (dataId) => {
  const { data } = await api.get(`/ship/info/${dataId}`);
  return data;
};
const filterShipsData = async (body) => {
  const { data } = await api.post('/ship/filter', body);
  return normalizeFilterResponse(data);
};

const deleteShipData = async (id) => {
  await api.delete(`/ship/delete/ship-data/${id}`);
};

export const ShipsDataService = {
  postShipData,
  filterShipsData,
  deleteShipData,
  editShipData,
  getShipDataById
};
