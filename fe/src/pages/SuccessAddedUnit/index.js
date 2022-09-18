import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CustomButton } from '../../components/CustomButton';
import { Headline } from '../../components/Headline';
import { Paragraph } from '../../components/Paragraph';
import { routesConfig } from '../../routing';

export function SuccessAddedUnit() {
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

  const toNewUnitPage = () => {
    navigate(routesConfig.addNewUnit.path);
  };

  return (
    <div className="add-new-unit">
      <Headline text="Новий пірозділ успішно додано" />
      <Paragraph text={location.state.unitName} />
      <CustomButton onClick={toNewUnitPage} text="Додати новий підрозділ" />
      <br />
      <CustomButton onClick={toNewShipPage} text="Додати новий корабель" />
    </div>
  );
}
