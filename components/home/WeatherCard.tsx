import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Cloud, CloudRain, Sun, Wind, ThermometerSun } from 'lucide-react-native';

// Types
import { WeatherData } from '@/types/weather';

type WeatherCardProps = {
  weather: WeatherData;
};

export default function WeatherCard({ weather }: WeatherCardProps) {
  // Get weather condition icon
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun size={48} color="#FF9800" />;
      case 'cloudy':
        return <Cloud size={48} color="#78909C" />;
      case 'rainy':
        return <CloudRain size={48} color="#42A5F5" />;
      case 'partly-cloudy':
        return <Cloud size={48} color="#BDBDBD" />;
      default:
        return <Sun size={48} color="#FF9800" />;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.currentWeather}>
        <View style={styles.tempContainer}>
          <Text style={styles.temperature}>{weather.temperature}°</Text>
          <Text style={styles.condition}>{weather.condition}</Text>
        </View>
        
        <View style={styles.iconContainer}>
          {getWeatherIcon(weather.condition)}
        </View>
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <ThermometerSun size={20} color="#FF9800" />
          <Text style={styles.detailText}>Real Feel: {weather.temperature - 1}°</Text>
        </View>
        
        <View style={styles.detailSeparator} />
        
        <View style={styles.detailItem}>
          <Wind size={20} color="#78909C" />
          <Text style={styles.detailText}>{weather.windSpeed} km/h</Text>
        </View>
        
        <View style={styles.detailSeparator} />
        
        <View style={styles.detailItem}>
          <Cloud size={20} color="#42A5F5" />
          <Text style={styles.detailText}>{weather.humidity}% Humidity</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  currentWeather: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tempContainer: {},
  temperature: {
    fontSize: 48,
    fontWeight: '700',
    color: '#212121',
  },
  condition: {
    fontSize: 16,
    color: '#757575',
  },
  iconContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    paddingTop: 16,
  },
  detailItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#616161',
    marginLeft: 8,
  },
  detailSeparator: {
    width: 1,
    height: 24,
    backgroundColor: '#EEEEEE',
  },
});