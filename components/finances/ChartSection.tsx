import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ChartSectionProps = {
  period: 'day' | 'week' | 'month' | 'year';
};

export default function ChartSection({ period }: ChartSectionProps) {
  // For simplicity, we're just showing a placeholder for a chart
  // In a real app, you'd use a charting library like react-native-chart-kit
  const renderMockChart = () => {
    const barCount = period === 'day' ? 24 : 
                   period === 'week' ? 7 : 
                   period === 'month' ? 30 : 12;
    
    const mockBars = Array(barCount).fill(0).map((_, i) => {
      // Generate random heights between 20 and 100
      const height = Math.floor(Math.random() * 80) + 20;
      return (
        <View 
          key={i} 
          style={[
            styles.mockBar, 
            { 
              height, 
              backgroundColor: height > 70 ? '#4CAF50' : '#81C784'
            }
          ]}
        />
      );
    });

    return (
      <View style={styles.mockChartContainer}>
        {mockBars}
      </View>
    );
  };

  // Labels for the chart based on period
  const renderLabels = () => {
    let labels: string[] = [];
    
    switch (period) {
      case 'day':
        labels = ['12 AM', '6 AM', '12 PM', '6 PM', '12 AM'];
        break;
      case 'week':
        labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        break;
      case 'month':
        labels = ['1', '5', '10', '15', '20', '25', '30'];
        break;
      case 'year':
        labels = ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'];
        break;
    }
    
    return (
      <View style={styles.labelsContainer}>
        {labels.map((label, i) => (
          <Text key={i} style={styles.labelText}>{label}</Text>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Income vs Expenses</Text>
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#4CAF50' }]} />
            <Text style={styles.legendText}>Income</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#F44336' }]} />
            <Text style={styles.legendText}>Expenses</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.chartContainer}>
        {renderMockChart()}
      </View>
      
      {renderLabels()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  legendContainer: {
    flexDirection: 'row',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#757575',
  },
  chartContainer: {
    height: 200,
    marginBottom: 8,
  },
  mockChartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
    paddingVertical: 8,
  },
  mockBar: {
    width: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelText: {
    fontSize: 12,
    color: '#9E9E9E',
    textAlign: 'center',
  },
});