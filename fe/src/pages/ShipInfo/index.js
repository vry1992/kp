import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchShipByKeyWords } from '../../components/SearchShipByKeyWords';
import { Headline } from '../../components/Headline';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchShipsList, getUnitNames } from '../../selectors';
import { setSearchShipsList } from '../../reducers/ships';
import { RefuseAddNewShipModal } from '../../components/RefuseAddNewSipModal';
import { routesConfig } from '../../routing';
import './index.scss';

export function ShipInfo() {
  const dispatch = useDispatch();
  const location = useLocation();
  const selectedShip = location.state ? location.state : null;
  const searchShipsList = useSelector(getSearchShipsList);
  const [selectedShipData, setSelectedShipData] = useState(selectedShip);
  const [iseRefuseModalOpen, setIsRefuseModalOpen] = useState(false);
  const unitNames = useSelector(getUnitNames);
  const navigate = useNavigate();

  function shipsListClickHandler(shipData) {
    setSelectedShipData(shipData);
  }

  function resetShipList() {
    setSelectedShipData(null);
    dispatch(setSearchShipsList([]));
  }

  useEffect(() => {
    if (Object.keys(unitNames).length === 0) {
      setIsRefuseModalOpen(true);
    } else {
      setIsRefuseModalOpen(false);
    }
  }, [unitNames]);

  const navigateToAddUnitPage = () => {
    setIsRefuseModalOpen(false);
    navigate(routesConfig.addNewShip.path);
  };

  function renderShipsList() {
    return (
      <Row className="justify-content-md-center">
        <Col xs={10}>
          <ListGroup>
            {searchShipsList.map(({ shipId, shipName }) => {
              return (
                <ListGroup.Item
                  as="li"
                  key={shipId}
                  onClick={() => shipsListClickHandler({ shipId, shipName })}>
                  {shipName}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
      </Row>
    );
  }

  return (
    <div className="ship-info">
      <Headline text="Додати інформацію про виявлений корабель" />
      <SearchShipByKeyWords selectedShipData={selectedShipData} resetShipList={resetShipList} />
      {!selectedShipData?.shipId && renderShipsList()}
      {iseRefuseModalOpen && (
        <RefuseAddNewShipModal
          show={iseRefuseModalOpen}
          onClick={navigateToAddUnitPage}
          text="Немає жодного доданого корабля."
          buttonText="Додати корабель"
        />
      )}
    </div>
  );
}
