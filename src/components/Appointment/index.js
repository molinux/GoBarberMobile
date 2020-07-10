import React, { useMemo, useState } from 'react';
import {
  format,
  subDays,
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

import { Container, Left, Avatar, Info, Name, Time } from './styles';

export default function Appointment({ onCancel, data }) {
  // const [date, setDate] = useState(new Date());

  // const date

  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.date]);

  return (
    <Container past={data.past}>
      <Left>
        <Avatar
          source={{
            uri: `https://api.adorable.io/avatar/50/${data.provider.name}.png`,
            // uri: data.provider.avatar
            //   ? data.provider.avatar.url
            //   : 'https://api.adorable.io/avatar/50/rocketseat.png',
            // 'https://avatars.dicebear.com/api/bottts/leonidas.svg?w[]=32px',
            // 'https://avatars.dicebear.com/api/bottts/leonidas.svg',
          }}
        />

        <Info>
          <Name>{data.provider.name}</Name>
          <Time>{dateParsed}</Time>
        </Info>
      </Left>

      {/* {data.cancelable && !data.canceled_at && ( */}
      {/* {data.cancelable && ( */}
      {!data.canceled_at && (
        <TouchableOpacity onPress={onCancel}>
          <Icon name="event-busy" size={20} color="#f64c75" />
        </TouchableOpacity>
      )}
    </Container>
  );
}
