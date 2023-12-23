import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Headline } from '../../components/Headline';
import { NewShipForm } from '../../components/NewShipForm';
import { RefuseAddNewShipModal } from '../../components/RefuseAddNewSipModal';
import { routesConfig } from '../../routing';
import { UnitServices } from '../../features/units/services/UnitServices';

export function AddNewShip() {
  const [iseRefuseModalOpen, setIsRefuseModalOpen] = useState(false);
  const navigate = useNavigate();

  const navigateToAddUnitPage = () => {
    setIsRefuseModalOpen(false);
    navigate(routesConfig.addNewUnit.path);
  };

  useEffect(() => {
    const getUnits = async () => {
      const units = await UnitServices.getUnits();
      if (!units.length) {
        setIsRefuseModalOpen(true);
      } else {
        setIsRefuseModalOpen(false);
      }
    };
    getUnits();
  }, []);

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
