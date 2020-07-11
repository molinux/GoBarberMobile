import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';

import { Container, HourList, Hour, Title } from './styles';

export default function SelectDateTime({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);

  const provider = navigation.getParam('provider');

  useEffect(() => {
    async function loadAvailable() {
      const response = await api.get(`providers/${provider.id}/available`, {
        params: {
          date: date.getTime(),
          // date: date.getTime() + date.getTimezoneOffset() * 60 * 1000,
          // date: date.setTime(
          //   date.getTime() + date.getTimezoneOffset() * 60 * 1000
          // ),
        },
      });

      setHours(response.data);
    }

    loadAvailable();
  }, [date, provider.id]);

  // console.log(`Data: ${date}`);

  // const timezone = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
  // console.log(`Timezone: ${timezone}`);

  function handleSelectHour(time) {
    navigation.navigate('Confirm', {
      provider,
      time,
    });
  }

  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />
        <HourList
          data={hours}
          extraData={date}
          keyExtractor={(item) => item.time}
          renderItem={({ item }) => (
            <Hour
              onPress={() => handleSelectHour(item.value)}
              enabled={item.available}>
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  );
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
  title: 'Selecione um horário',
  headerLeft: () => (
    <TouchableOpacity
      onPres={() => {
        navigation.goBack();
      }}>
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});
