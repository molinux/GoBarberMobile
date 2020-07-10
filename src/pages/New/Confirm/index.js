import React, { useMemo, useState } from 'react';
import {
  format,
  subDays,
  addHours,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  isEqual,
  parseISO,
  formatRelative,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, Avatar, Name, Time, SubmitButton } from './styles.js';

// Teste
const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const timezone = -3;

export default function Confirm({ navigation }) {
  const provider = navigation.getParam('provider');
  const time = navigation.getParam('time');
  const timeZoned = addHours(time, timezone);

  console.log(`Horario: ${time}`);
  console.log(`Time: ${time}`);
  console.log(`TimeZoned: ${timeZoned}`);
  // const hoje = new Date();
  // console.log(`Hoje: ${hoje}`);

  // const newTime = time;
  // const timeZone = addHours(parseISO(newTime), -3);
  // console.log(`timezone: ${timeZone}`);

  const dateFormatted = useMemo(
    () =>
      // Estava adicionando +3hs
      // formatRelative(parseISO(time, time), new Date(), {
      formatRelative(addHours(parseISO(time, time), timezone), new Date(), {
        locale: pt,
      }),
    [time]
  );

  // console.log(`dateFormatted ${dateFormatted}`);

  async function handleAddAppointment() {
    await api.post('appointments', {
      provider_id: provider.id,
      date: time,
    });

    navigation.navigate('Dashboard');
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url
              : `https://api.adorable.io/avatar/50/${provider.name}.png`,
          }}
        />

        <Name>{provider.name}</Name>

        <Time>{dateFormatted}</Time>

        <SubmitButton onPress={handleAddAppointment}>
          Confirmar agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
}

Confirm.navigationOptions = ({ navigation }) => ({
  title: 'Confirmar agendamento',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});
