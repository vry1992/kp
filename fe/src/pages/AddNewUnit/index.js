import React from 'react';
import { Headline } from '../../components/Headline';
import { NewUnitForm } from '../../components/NewUnitForm';

export function AddNewUnit() {
  return (
    <div className="add-new-unit">
      <Headline text="Додати новий підрозділ" />
      <NewUnitForm />
    </div>
  );
}
