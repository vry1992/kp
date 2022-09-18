import { statuses } from "../../constants/statuses.js";
import { pool } from '../../db.js'
import { getId } from "../../utils/index.js";
import { unitsTableConfig } from "../../constants/tables.js";
import { checkUnitExisting } from "../../middleware/checkExisting.js";
import { unitAlreadyExists } from "../../helpers/errorsBuilder.js";

export async function postUnit(request, response) {
  try {
    const { body: requestBody } = request;
    const { tableName: unitsTableName, columns: unitsColumns } = unitsTableConfig;
    const { unitId, unitName, city } = unitsColumns;

    if (!requestBody.conflictConfirmed) {
      const existingResult = await checkUnitExisting({
        tableName: unitsTableName,
        searchField: [unitName.colName],
        whereField: unitName.colName,
        whereSeacrh: requestBody[unitName.bodyKey]
      });
  
      if (existingResult.length) {
        response
          .status(statuses.badRequest)
          .json(unitAlreadyExists(existingResult));
        response.end();
        return;
      };
    }

    await pool(unitsTableName).insert({
      [unitId.colName]: getId(),
      ...(requestBody[unitName.bodyKey] && { [unitName.colName]: requestBody[unitName.bodyKey] }),
      ...(requestBody[city.bodyKey] && { [city.colName]: requestBody[city.bodyKey] }),
    });

    const selectedRows = await pool.select(unitId.colName, unitName.colName).from(unitsTableName);
    
    response.status(statuses.successCreate).json(selectedRows);
    response.end();
  }
  catch(error) {
    console.log(error);
    response.sendStatus(statuses.commonServerError);
    response.end();
  }
};