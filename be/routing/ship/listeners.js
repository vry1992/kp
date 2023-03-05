import { statuses } from "../../constants/statuses.js";
import { pool } from '../../db.js'
import { getId } from "../../utils/index.js";
import { shipsTableConfig, unitsTableConfig, shipsDataTableConfig } from "../../constants/tables.js";
import { checkShipExisting } from "../../middleware/checkExisting.js";
import { shipAlreadyExists } from "../../helpers/errorsBuilder.js";

export async function postShip(request, response) {
  try {

    const { tableName: shipsTableName, columns: shipsColumns } = shipsTableConfig;
    const { tableName: unitsTableName, columns: unitsColumns } = unitsTableConfig;
    const { body: requestBody } = request;
    const { shipId, shipName, bortNumber, project, shipType, shipUnit, city: shipCity } = shipsColumns;
    const { unitId, unitName } = unitsColumns;

    const existingResult = await checkShipExisting({
      tableName: shipsTableName,
      searchField: [bortNumber.colName, shipName.colName],
      whereField: bortNumber.colName,
      whereSeacrh: requestBody[bortNumber.bodyKey]
    });

    if (existingResult.length) {
      response
        .status(statuses.badRequest)
        .json(shipAlreadyExists(existingResult.shift()));
      response.end();
      return;
    };

    await pool(shipsTableName).insert({
      [shipId.colName]: getId(),
      ...(requestBody[shipName.bodyKey] && { [shipName.colName]: requestBody[shipName.bodyKey] }),
      ...(requestBody[bortNumber.bodyKey] && { [bortNumber.colName]: requestBody[bortNumber.bodyKey] }),
      ...(requestBody[project.bodyKey] && { [project.colName]: requestBody[project.bodyKey] }),
      ...(requestBody[shipType.bodyKey] && { [shipType.colName]: requestBody[shipType.bodyKey] }),
      ...(requestBody[shipUnit.bodyKey] && { [shipUnit.colName]: requestBody[shipUnit.bodyKey] }),
      ...(requestBody[shipCity.bodyKey] && { [shipCity.colName]: requestBody[shipCity.bodyKey] }),
    });

    const selectedRows = await pool(unitsTableName)
      .join(shipsTableName, unitId.colName, shipUnit.colName)
      .select(
        unitName.colName,
        pool.raw(`JSON_AGG((${shipName.colName}, ${shipId.colName})) as ships`)
      ).groupBy(unitName.colName);

    response.status(statuses.successCreate).json(selectedRows);
    response.end();
  }
  catch(error) {
    response.sendStatus(statuses.commonServerError).end();
  }
};

export async function postSearchShipByKeyWord(request, response) {
  const { tableName: shipsTableName, columns: shipsColumns } = shipsTableConfig;
  const { shipId, shipName, shipType, bortNumber, project } = shipsColumns;
  const { body: { search } } = request;

  const selectedRows = await pool(shipsTableName)
    .select(shipId.colName, shipName.colName, shipType.colName)
    .whereILike(shipName.colName, `%${search}%`)
    .orWhereILike(bortNumber.colName, `%${search}%`)
    .orWhereILike(project.colName, `%${search}%`)

  response.status(statuses.commonSuccess).json(selectedRows);
};

export async function postShipData(request, response) {

  const { body: requestBody } = request;
  const { tableName: shipsDataTableName, columns: shipsDataColumns } = shipsDataTableConfig;
  const { 
    dataId, 
    discoverTimestamp, 
    latitude, 
    longitude, 
    peleng, 
    personWhoAdded, 
    createTimestamp, 
    additionalInformation, 
    shipId: fkShipId, 
    frequency, 
    shipCallsign, 
    companionCallsign
   } = shipsDataColumns;

   const { tableName: shipsTableName, columns: shipsColumns } = shipsTableConfig;
   const { shipName, shipId } = shipsColumns;

   try {
    await pool(shipsDataTableName).insert({
      [dataId.colName]: getId(),
      [createTimestamp.colName]: Date.now(),
      ...(requestBody[discoverTimestamp.bodyKey] && { [discoverTimestamp.colName]: requestBody[discoverTimestamp.bodyKey] }),
      ...(requestBody[latitude.bodyKey] && { [latitude.colName]: requestBody[latitude.bodyKey] }),
      ...(requestBody[longitude.bodyKey] && { [longitude.colName]: requestBody[longitude.bodyKey] }),
      ...(requestBody[peleng.bodyKey] && { [peleng.colName]: requestBody[peleng.bodyKey] }),
      ...(requestBody[personWhoAdded.bodyKey] && { [personWhoAdded.colName]: requestBody[personWhoAdded.bodyKey] }),
      ...(requestBody[additionalInformation.bodyKey] && { [additionalInformation.colName]: requestBody[additionalInformation.bodyKey] }),
      ...(requestBody[fkShipId.bodyKey] && { [fkShipId.colName]: requestBody[fkShipId.bodyKey] }),
      ...(requestBody[frequency.bodyKey] && { [frequency.colName]: requestBody[frequency.bodyKey] }),
      ...(requestBody[shipCallsign.bodyKey] && { [shipCallsign.colName]: requestBody[shipCallsign.bodyKey] }),
      ...(requestBody[companionCallsign.bodyKey] && { [companionCallsign.colName]: requestBody[companionCallsign.bodyKey] }),
    });

    const data = await pool(shipsTableName)
      .join(shipsDataTableName, shipId.colName, fkShipId.colName)
      .select(
        pool.raw(`JSON_AGG(DISTINCT(${shipCallsign.colName})) as call_signs`),
        pool.raw(`ARRAY_AGG(DISTINCT(${personWhoAdded.colName})) as persons_who_added`),
        pool.raw(`ARRAY_AGG(DISTINCT(${shipName.colName})) as ships`)
      );

    response.status(statuses.successCreate).json(data.shift());
    response.end();
   }
   catch(error) {
    console.log(error);
   }
   finally {

   }
}

export async function filterShipData(request, response) {
  try {
    const { tableName: shipsTableName, columns: shipsColumns } = shipsTableConfig;
    const { body: requestBody } = request;
    const { shipId, shipName } = shipsColumns;
    const {tableName: shipsDataTableName, columns: shipsDataColumns } = shipsDataTableConfig;
    const { discoverTimestamp } = shipsDataColumns;
    const { shipId: fkShipId, frequency, personWhoAdded, shipCallsign } = shipsDataColumns;

    const selectedRows = await pool(shipsTableName)
    .join(shipsDataTableName, shipId.colName, fkShipId.colName)
      .select(
          shipsDataColumns.dataId.colName,
          shipsDataColumns.discoverTimestamp.colName,
          shipsDataColumns.latitude.colName,
          shipsDataColumns.longitude.colName,
          shipsDataColumns.peleng.colName,
          shipsDataColumns.personWhoAdded.colName,
          shipsDataColumns.createTimestamp.colName,
          shipsDataColumns.personWhoEdited.colName,
          shipsDataColumns.editTimestamp.colName,
          shipsDataColumns.additionalInformation.colName,
          shipsDataColumns.frequency.colName,
          shipsDataColumns.shipId.colName,
          shipsDataColumns.shipCallsign.colName,
          shipsDataColumns.companionCallsign.colName,
          shipsColumns.shipName.colName,
          shipsColumns.bortNumber.colName,
          shipsColumns.project.colName,
          shipsColumns.shipType.colName,
          shipsColumns.shipUnit.colName,
          shipsColumns.city.colName
      )
      .where((queryBuilder) => {
        if (requestBody[shipName.bodyKeyList].length) {
          queryBuilder.whereIn(shipName.colName, requestBody[shipName.bodyKeyList]);
        }
      })
      .where((queryBuilder) => {
        queryBuilder.whereBetween(discoverTimestamp.colName, [requestBody.dateFrom, requestBody.dateTo]);
        if (requestBody[frequency.bodyKey]) {
          queryBuilder.andWhere(frequency.colName, requestBody[frequency.bodyKey]);
        }
        if (requestBody[personWhoAdded.bodyKeyList].length) {
          queryBuilder.whereIn(personWhoAdded.colName, requestBody[personWhoAdded.bodyKeyList]);
        }
        if (requestBody[shipCallsign.bodyKeyList].length) {
          queryBuilder.whereIn(shipCallsign.colName, requestBody[shipCallsign.bodyKeyList]);
        }
      })
      .orderBy(shipsDataColumns.discoverTimestamp.colName, 'desc')
      
    response.status(statuses.successCreate).json(selectedRows);
    response.end();
  }
  catch(error) {
    console.log(error)
    response.sendStatus(statuses.commonServerError).end();
  }
}