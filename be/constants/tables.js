export const shipsTableConfig = {
    tableName: 'ships',
    columns: {
        shipId: {
            colName: 'ship_id',
            bodyKey: 'shipId'
        },
        shipName: {
            colName: 'ship_name',
            bodyKey: 'shipName',
            bodyKeyList: 'shipNameList',
        },
        bortNumber: {
            colName: 'ship_bort_number',
            bodyKey: 'bortNumber'
        },
        project: {
            colName: 'ship_project',
            bodyKey: 'project'
        },
        shipType: {
            colName: 'ship_type',
            bodyKey: 'shipType'
        },
        shipUnit: {
            colName: 'fk_unit_id',
            bodyKey: 'shipUnit'
        },
        city: {
            colName: 'ship_city',
            bodyKey: 'city'
        },
    }    
};

export const unitsTableConfig = {
    tableName: 'units',
    columns: {
        unitId: {
            colName: 'unit_id',
            bodyKey: 'unitId'
        },
        unitName: {
            colName: 'unit_name',
            bodyKey: 'unitName'
        },
        city: {
            colName: 'unit_city',
            bodyKey: 'city'
        },
    }    
};

export const shipsDataTableConfig = {
    tableName: 'ships_data',
    columns: {
        dataId: {
            colName: 'data_id',
            bodyKey: 'dataId'
        },
        discoverTimestamp: {
            colName: 'discover_timestamp',
            bodyKey: 'discoverTimestamp'
        },
        latitude: {
            colName: 'latitude',
            bodyKey: 'latitude'
        },
        longitude: {
            colName: 'longitude',
            bodyKey: 'longitude'
        },
        peleng: {
            colName: 'peleng',
            bodyKey: 'peleng'
        },
        personWhoAdded: {
            colName: 'person_who_added',
            bodyKey: 'personName',
            bodyKeyList: 'personNameList'
        },
        createTimestamp: {
            colName: 'create_timestamp',
            bodyKey: 'createTimestamp'
        },
        personWhoEdited: {
            colName: 'person_who_edited',
            bodyKey: 'personWhoEdited'
        },
        editTimestamp: {
            colName: 'edit_timestamp',
            bodyKey: 'editTimestamp'
        },
        additionalInformation: {
            colName: 'additional_information',
            bodyKey: 'additionalInformation'
        },
        shipId: {
            colName: 'fk_ship_data_id',
            bodyKey: 'shipId'
        },
        frequency: {
            colName: 'frequency',
            bodyKey: 'frequency'
        },
        shipCallsign: {
            colName: 'ship_callsign',
            bodyKey: 'shipCallsign',
            bodyKeyList: 'shipCallsignList'
        },
        companionCallsign: {
            colName: 'companion_callsign',
            bodyKey: 'companionCallsign'
        },
    }   
};