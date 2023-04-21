import React, { useState } from 'react';
import { Button } from 'react-native';
import ChangePasswordForm from './ChangePasswordForm';

const ChangePasswordButton = () => {
  const [showForm, setShowForm] = useState(false);

  const handlePress = () => {
    setShowForm(true);
  };

  if (showForm) {
    return <ChangePasswordForm />;
  } else {
    return (
      <Button
        title="Cambiar contraseña"
        onPress={handlePress}
      />
    );
  }
};

export default ChangePasswordButton;
