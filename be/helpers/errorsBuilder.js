import { ships } from "../constants/errorKeys.js"

export const shipAlreadyExists = ({ ship_bort_number, ship_name }) => {
    return {
        message: `Корабель із бортовим номером ${ship_bort_number} під назвою ${ship_name} вже існує`,
    }
}

export const unitAlreadyExists = (units) => {
    return {
        message: `Підрозділ${units.length > 1 ? 'и' : ''} зі схожим ім'ям \"${units.map(unit => unit.unit_name).join(', ')}\" ${units.length > 1 ? 'вже існують' : 'вже існує'} `,
    }
}