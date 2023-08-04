
import React from 'react';
import { Calendar } from 'react-native-calendars';


LocaleConfig.locales['fr'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'Tháng 1.',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  dayNames: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
  dayNamesShort: ['T2.', 'T3.', 'T4.', 'T5.', 'T6.', 'T7.', 'CN'],
  today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = 'fr';

const Calendars = () => {
  return (
    <Calendar
      style={{
        borderWidth: 1,
        borderColor: 'gray',
        height: 350,
      }}
      markingType={'period'}
      onDayPress={day => {
        const selectedDate = day.dateString;
        const selectedTasks = markedDates[selectedDate];
        console.log('Selected day========>>>', selectedTasks.tasks);
        Alert.alert(day.dateString, selectedTasks.tasks);
      }}
      markedDates={markedDates}
    />
  );
};

export default Calendars;
