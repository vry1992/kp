import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Headline } from '../../components/Headline';
import { NewShipForm } from '../../components/NewShipForm';
import { RefuseAddNewShipModal } from '../../components/RefuseAddNewSipModal';
import { routesConfig } from '../../routing';
import { getUnitNames } from '../../selectors';

export function AddNewShip() {
  const [iseRefuseModalOpen, setIsRefuseModalOpen] = useState(false);
  const navigate = useNavigate();
  const unitNames = useSelector(getUnitNames);

  const navigateToAddUnitPage = () => {
    setIsRefuseModalOpen(false);
    navigate(routesConfig.addNewUnit.path);
  };

  useEffect(() => {
    if (Object.keys(unitNames).length === 0) {
      setIsRefuseModalOpen(true);
    } else {
      setIsRefuseModalOpen(false);
    }
  }, [unitNames]);

  return (
    <div className="add-new-ship">
      <Headline text="Додати новий корабель" />
      <NewShipForm />
      {iseRefuseModalOpen && (
        <RefuseAddNewShipModal show={iseRefuseModalOpen} onClick={navigateToAddUnitPage} />
      )}
    </div>
  );
}
