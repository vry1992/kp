import { pool } from '../db.js'

export const checkShipExisting = async (searchConfig) => {
    const { tableName, searchField, whereField, whereSeacrh } = searchConfig;
    const existingResult = await pool(tableName).select(searchField).where(whereField, whereSeacrh)
    return existingResult
}

export const checkUnitExisting = async (searchConfig) => {
    const { tableName, searchField, whereField, whereSeacrh } = searchConfig;
    const unitNumberRegexp = new RegExp(/(\d*)/)
    const regexpExecuted = unitNumberRegexp.exec(whereSeacrh)
    if (regexpExecuted[1]) {
        const existingResultFirstTry = await pool(tableName)
            .select(searchField)
            .whereILike(whereField, `%${regexpExecuted[1]}%`);
        if (existingResultFirstTry) {
            console.log(1)
            return existingResultFirstTry;
        }
    }
    else {
        const existingResultSecondTry = await pool(tableName)
        .select(searchField)
        .where(whereField, whereSeacrh);
        if (existingResultSecondTry) {
            console.log(2, existingResultSecondTry)
            return existingResultSecondTry;
        }
    }
    return []
}
