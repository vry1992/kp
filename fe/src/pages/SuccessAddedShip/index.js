import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CustomButton } from '../../components/CustomButton';
import { Headline } from '../../components/Headline';
import { Paragraph } from '../../components/Paragraph';
import { shipTypes } from '../../constants';
import { routesConfig } from '../../routing';

export function SuccessAddedShip() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      navigate(routesConfig.addNewShip.path);
    }
  }, [location]);

  const toNewShipPage = () => {
    navigate(routesConfig.addNewShip.path);
  };

  const toShipInfoPage = () => {
    navigate(routesConfig.shipInfo.path);
  };

  return (
    <div className="add-new-ship">
      <Headline text="Новий корабель успішно додано" />
      <Paragraph text={shipTypes[location.state.shipType].name} />
      <Paragraph text={location.state.shipName} />
      <CustomButton onClick={toNewShipPage} text="Додати новий корабель" />
      <br />
      <CustomButton
        onClick={toShipInfoPage}
        text={`Ввести інформацію про виявлення ${shipTypes[location.state.shipType].name} ${
          location.state.shipName
        }`}
      />
    </div>
  );
}
