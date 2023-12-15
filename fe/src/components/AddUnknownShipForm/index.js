import React, { useCallback, useState } from 'react';
import { CustomButton } from '../CustomButton';
import { Row, ListGroup } from 'react-bootstrap';
import { FormField } from '../FormField';
import { getTypesOptions } from '../../constants/newShipForm';
import { useDispatch, useSelector } from 'react-redux';
import { postSearchShipKeyWord } from '../../actions/ships';
import { getSearchShipsList } from '../../selectors';
import { shipTypes } from '../../constants';
import { setSearchShipsList } from '../../reducers/ships';

export const AddUnknownShipForm = ({ onSaveUnknown, isDisabled }) => {
  const [selectedVariants, setSelectedVariants] = useState({});
  const [variantsCount, setVariantsCount] = useState(1);
  const searchShipsList = useSelector(getSearchShipsList);
  const dispatch = useDispatch();

  function onSubmitSearch(payload) {
    dispatch(postSearchShipKeyWord(payload));
  }

  function onSearchShipChange(event, idx) {
    const {
      target: { value }
    } = event;
    if (value.length) {
      onSubmitSearch({ data: { search: value }, onError: () => {}, onSuccess: () => {} });
    }
    setSelectedVariants((prev) => {
      return {
        ...prev,
        [idx]: {
          ...prev[idx],
          search: value
        }
      };
    });
  }

  const searchShipsListResult = useCallback(
    (id) => {
      return searchShipsList
        .filter(({ shipType }) => shipType === selectedVariants[id]?.type)
        .map(({ shipId, shipName }) => ({ shipId, shipName }));
    },
    [searchShipsList]
  );

  const searchShipsPossibleListResult = useCallback(
    (id) => {
      return searchShipsList
        .filter(({ shipType }) => shipType !== selectedVariants[id]?.type)
        .map(({ shipId, shipName, shipType }) => ({ shipId, shipName, shipType }));
    },
    [searchShipsList]
  );

  function renderShipsList(id) {
    return (
      <Row className="justify-content-md-center">
        <ListGroup>
          {searchShipsListResult(id).map(({ shipId, shipName }) => {
            return (
              <ListGroup.Item
                as="li"
                key={'shipId'}
                onClick={() => selectShipFromList({ shipId, shipName }, id)}>
                {shipName}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Row>
    );
  }

  function renderPossibleShipsList(id) {
    return (
      <Row className="justify-content-md-center">
        <ListGroup>
          {searchShipsPossibleListResult(id).map(({ shipId, shipName, shipType }) => {
            return (
              <ListGroup.Item
                as="li"
                key={'shipId'}
                onClick={() => selectShipFromPossibleList({ shipId, shipName, shipType }, id)}>
                {shipTypes[shipType]?.name} {shipName}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Row>
    );
  }

  const selectShipFromList = ({ shipName, shipId }, id) => {
    setSelectedVariants((prev) => {
      return {
        ...prev,
        [id]: {
          ...prev[id],
          shipId,
          shipName,
          search: ''
        }
      };
    });
    dispatch(setSearchShipsList([]));
  };

  const selectShipFromPossibleList = ({ shipName, shipId, shipType }, id) => {
    setSelectedVariants((prev) => {
      return {
        ...prev,
        [id]: {
          shipId,
          shipName,
          type: shipType
        }
      };
    });
    dispatch(setSearchShipsList([]));
  };

  const onChageType = (e, id) => {
    dispatch(setSearchShipsList([]));
    setSelectedVariants((prev) => {
      return {
        ...prev,
        [id]: {
          shipId: '',
          shipName: '',
          type: e.target.value,
          search: ''
        }
      };
    });
  };

  return (
    <>
      {Array.from({ length: variantsCount }).map((_, idx) => {
        return (
          <React.Fragment key={idx}>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '100%' }}>
                <FormField
                  name="shipType"
                  required={true}
                  label="Оберіть тип"
                  value={selectedVariants[idx]?.type || ''}
                  type="select"
                  multiple={false}
                  onChange={(e) => onChageType(e, idx)}
                  options={getTypesOptions()}
                  disabled={isDisabled}
                />
                <FormField
                  onChange={(value) => onSearchShipChange(value, idx)}
                  value={selectedVariants[idx]?.search || selectedVariants[idx]?.shipName}
                  type="text"
                  placeholder="Введіть назву корабля"
                  label="Введіть назву корабля"
                  fieldName="search"
                  disabled={
                    selectedVariants[idx]?.shipName || !selectedVariants[idx]?.type || isDisabled
                  }
                />
              </div>
              {/* <CustomButton
                onClick={() => {
                  setSelectedVariants((prev) => {
                    const deleted = prev[idx];
                    deleted.shipId = '';
                    deleted.shipName = '';
                    deleted.shipType = '';
                    return {
                      ...prev,
                      [idx]: deleted
                    };
                  });
                }}
                iconPath={`${process.env.PUBLIC_URL}/images/icons/delete.png`}
                size="sm"
                style={{ margin: 0, height: '132px' }}
              /> */}
            </div>

            {!selectedVariants[idx]?.shipName ? renderShipsList(idx) : null}
            {selectedVariants[idx]?.search?.length >= 2 &&
            !searchShipsListResult(idx).length &&
            !selectedVariants[idx]?.shipName ? (
              <>
                <p>Можливо ви маєте на увазі:</p>
                {renderPossibleShipsList(idx)}
              </>
            ) : null}
          </React.Fragment>
        );
      })}
      {!isDisabled ? (
        <CustomButton
          text={'Додати варіант'}
          onClick={() => {
            setVariantsCount(variantsCount + 1);
          }}
          disabled={variantsCount > Object.keys(selectedVariants).length}
        />
      ) : null}

      {Object.keys(selectedVariants).length && !isDisabled ? (
        <CustomButton text={'Зберегти'} onClick={() => onSaveUnknown(selectedVariants)} />
      ) : null}
    </>
  );
};
