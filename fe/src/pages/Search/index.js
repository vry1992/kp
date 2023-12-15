import React, { useCallback } from 'react';
import { Headline } from '../../components/Headline';
import { SearchForm } from '../../components/SearchForm';

import Table from 'react-bootstrap/Table';
import { getFilterShipData } from '../../selectors';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import { parseDate } from '../../helpers';
import { CustomTooltip } from '../../components/CustomTooltip';
import { CustomButton } from '../../components/CustomButton';
import { shipTypes } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { routesConfig } from '../../routing';
import { deleteShipItemData } from '../../actions/ships';

export function Search() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filterTableConfig = {
    topLine: {
      shipName: {
        text: 'Назва'
      },
      shipType: {
        text: 'Тип'
      },
      shipProject: {
        text: 'Проєкт'
      },
      shipCity: {
        text: 'Місто дислокації'
      },
      shipBortNumber: {
        text: 'Бортовий номер'
      },
      peleng: {
        text: 'Пеленг'
      },
      latitude: {
        text: 'Широта'
      },
      longitude: {
        text: 'Довгота'
      },
      frequency: {
        text: 'Частота виявлення'
      }
    },
    secondLine: ['additionalInformation'],
    thirdLine: {
      personsWhoAdded: {
        text: 'Хто добавив:'
      },
      createTimestamp: {
        text: 'Добавлено:'
      }
    },
    fourthLine: {
      personWhoEdited: {
        text: 'Хто відредагував:'
      },
      editTimestamp: {
        text: 'Відредаговано:'
      }
    }
  };

  const filterShipsData = useSelector(getFilterShipData);

  const onEditClick = ({ dataId }) => {
    navigate(`/ship-info/edit/${dataId}`);
  };

  const onDeleteClick = ({ dataId }) => {
    dispatch(deleteShipItemData(dataId));
  };

  const renderTableBody = useCallback(() => {
    return filterShipsData.map((row, index) => {
      return (
        <React.Fragment key={index}>
          <tr>
            {Object.keys(filterTableConfig.topLine).map((col, idx) => (
              <td rowSpan={idx === 0 ? 4 : 1} key={`${col}_${index}`}>
                <CustomTooltip text={filterTableConfig.topLine[col].text}>
                  <span>{col === 'shipType' ? shipTypes[row[col]]?.name : row[col]}</span>
                </CustomTooltip>
                {idx === 0 ? (
                  <div>
                    <CustomButton
                      onClick={() => onEditClick(row)}
                      iconPath={`${process.env.PUBLIC_URL}/images/icons/pencil.png`}
                      size="sm"
                    />
                    <br />
                    <CustomButton
                      onClick={() => onDeleteClick(row)}
                      iconPath={`${process.env.PUBLIC_URL}/images/icons/delete.png`}
                      size="sm"
                    />
                  </div>
                ) : null}
              </td>
            ))}
          </tr>
          <tr>
            {filterTableConfig.secondLine.map((item) => (
              <td colSpan={Object.keys(filterTableConfig.topLine).length} key={`${item}_${index}`}>
                {row[item] ? row[item] : 'Додаткової інформації немає'}
              </td>
            ))}
          </tr>
          <tr>
            {Object.entries(filterTableConfig.thirdLine).map(([key, { text }]) => (
              <td
                colSpan={
                  Object.keys(filterTableConfig.topLine).length /
                  Object.keys(filterTableConfig.thirdLine).length
                }
                key={`${key}_${index}`}>
                {text}
                <i>{key === 'createTimestamp' ? parseDate(row[key]) : row[key]}</i>
              </td>
            ))}
          </tr>
          <tr className="bottom-row">
            {Object.entries(filterTableConfig.fourthLine).map(([key, { text }]) => (
              <td
                colSpan={
                  Object.keys(filterTableConfig.topLine).length /
                  Object.keys(filterTableConfig.fourthLine).length
                }
                key={`${key}_${index}`}>
                {text}{' '}
                {row[key] ? (
                  <i>{key === 'editTimestamp' ? parseDate(row[key]) : row[key]}</i>
                ) : (
                  <i>не редагувалось</i>
                )}
              </td>
            ))}
          </tr>
        </React.Fragment>
      );
    });
  }, [filterShipsData]);

  const onShowOnMapClick = () => {
    navigate(routesConfig.map.path, { state: filterShipsData });
  };

  return (
    <div className="search">
      <Headline text="Пошук" />
      <SearchForm />
      {filterShipsData.length ? <CustomButton text="На карту" onClick={onShowOnMapClick} /> : null}
      <br />
      <Table responsive>
        <thead>
          <tr>
            {Object.entries(filterTableConfig.topLine).map(([key, { text }]) => {
              return (
                <th className="ships-table-head" key={key}>
                  {text}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{renderTableBody()}</tbody>
      </Table>
    </div>
  );
}
