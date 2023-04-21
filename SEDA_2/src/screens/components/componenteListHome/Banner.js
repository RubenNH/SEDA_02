import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';

const Banner = ({ sensor, temperature }) => {
  const [icon, setIcon] = useState(null);

  // Función para actualizar el icono basado en el sensor
  const updateIcon = () => {
    let icono_segun_sensor;
    switch (sensor) {
      case 'Sensor1':
        icono_segun_sensor = require('../../../../assets/imgs/foco.png');
        break;
      case 'Sensor2':
        icono_segun_sensor = require('../../../../assets/imgs/foco.png');
        break;
      case 'Sensor3':
        icono_segun_sensor = require('../../../../assets/imgs/foco.png');
        break;
      default:
        icono_segun_sensor = require('../../../../assets/imgs/foco.png');
    }
    setIcon(icono_segun_sensor);
  }

  // Actualiza el icono cuando cambia el sensor
  useEffect(() => {
    updateIcon();
  }, [sensor]);

  return (
    <View>
      <Image source={icon} />
      <Text>{`${temperature} °C`}</Text>
    </View>
  );
};

export default Banner;
