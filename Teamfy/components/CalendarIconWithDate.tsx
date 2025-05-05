import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getDate } from 'date-fns';

export default function CalendarIconWithDate({size, color}: {size: number, color: string}) {
  const day = getDate(new Date());

  return (
    <View style={{ width: 24, height: 24, justifyContent: 'center',
      alignItems: 'center',}}>
      <Ionicons name="calendar-clear" size={size} color={color} />
      <Text
        style={{
          position: 'absolute',
          top: 7,
          fontSize: 13,
          color: 'white',
        }}
      >
        {day}
      </Text>
    </View>
  );
}
