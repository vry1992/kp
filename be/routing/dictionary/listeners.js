import { statuses } from "../../constants/statuses.js";
import { shipsDataTableConfig, shipsTableConfig, unitsTableConfig } from "../../constants/tables.js";
import { pool } from '../../db.js'

export async function initDictionary(_request, response) {
  try {
    const { tableName: unitsTableName, columns: unitsColumns } = unitsTableConfig;
    const { unitId, unitName } = unitsColumns;

    const { tableName: shipsDataTableName, columns: shipsDataColumns } = shipsDataTableConfig;
    const { shipCallsign, personWhoAdded, shipId: fkShipId} = shipsDataColumns;

    const { tableName: shipsTableName, columns: shipsColumns } = shipsTableConfig;
    const { shipName, shipId } = shipsColumns;

    const units = await pool.select(unitId.colName, unitName.colName).from(unitsTableName);

    const data = await pool(shipsTableName)
      .join(shipsDataTableName, shipId.colName, fkShipId.colName)
      .select(
        pool.raw(`JSON_AGG(DISTINCT(${shipCallsign.colName})) as call_signs`),
        pool.raw(`ARRAY_AGG(DISTINCT(${personWhoAdded.colName})) as persons_who_added`),
        pool.raw(`ARRAY_AGG(DISTINCT(${shipName.colName})) as ships`)
      );

    response.status(statuses.successCreate).json({ units, ...data.shift() });
    response.end();
  }
  catch(error) {
    console.log(error);
    response.sendStatus(statuses.commonServerError);
    response.end();
  }
};