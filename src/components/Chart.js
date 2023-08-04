import axios from 'axios';
import React from 'react';
import {View, Dimensions, ScrollView} from 'react-native';
import {BarChart, StackedBarChart} from 'react-native-chart-kit';
import c from '../constant/theme';

const {width, height} = Dimensions.get('window');
const Chart = ({data}) => {
  //   const MAX_LABEL_LENGTH = 10;
  //   const truncateLabel = label => {
  //     if (label.length <= MAX_LABEL_LENGTH) {
  //       return label;
  //     }
  //     const firstChar = label.slice(0, MAX_LABEL_LENGTH / 2);
  //     const lastChar = label.slice(-MAX_LABEL_LENGTH / 2);
  //     return `${firstChar}...${lastChar}`;
  //   };
  //   let truncatedLabels = [];
  //   if (Array.isArray(newData.chart_label_day)) {
  //     truncatedLabels = newData.chart_label_day.map(label =>
  //       truncateLabel(label),
  //     );
  //   } else if (newData.chart_label_day) {
  //     truncatedLabels = [newData.chart_label_day]; // Chuyển đổi thành một mảng đơn lẻ
  //   }

  //   const data = {
  //     labels: newData.chart_label_day,
  //     datasets: [
  //       {
  //         data: newData.chart_label_total,
  //       },
  //     ],
  //   };
  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    fillShadowGradientOpacity: 0.5,
    // color: c.COLORS.main,
    color: (opacity = 0.2) => `rgba(89, 143, 85, ${opacity})`,
    strokeWidth: 2, // Độ dày đường viền
    style: {
      textShadowColor: '#fff',
      textShadowOffset: {width: 1, height: 1},
      textShadowRadius: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis', // Hiển thị dấu "..." khi tên quá dài
    },
  };
  return (
    <ScrollView horizontal>
      <BarChart
        style={{
          height: 150,
          padding: 15,
          borderRadius: 10,
          // shadowColor: '#000',
          // shadowOpacity: 0.4,
          // shadowOffset: {width: 2, height: 5},
          // shadowRadius: 5,
          // elevation: 4,
        }}
        data={data}
        width={Dimensions.get('window').width * 2}
        height={200}
        yAxisLabel={''}
        chartConfig={chartConfig}
      />
    </ScrollView>
  );
};

export default Chart;
