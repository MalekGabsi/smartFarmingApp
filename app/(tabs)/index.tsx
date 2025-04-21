import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Cloud, CloudRain, Sun, Wind, ThermometerSun, Calendar, Sprout, TriangleAlert as AlertTriangle } from 'lucide-react-native';

// Components
import Header from '@/components/Header';
import WeatherCard from '@/components/home/WeatherCard';
import ActivityCard from '@/components/home/ActivityCard';
import AlertCard from '@/components/home/AlertCard';

// Types
import { WeatherData } from '@/types/weather';
import { Activity } from '@/types/activity';

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 24,
    condition: 'Sunny',
    humidity: 65,
    windSpeed: 8,
    forecast: [
      { day: 'Today', temp: 24, condition: 'sunny' },
      { day: 'Wed', temp: 22, condition: 'partly-cloudy' },
      { day: 'Thu', temp: 19, condition: 'cloudy' },
      { day: 'Fri', temp: 17, condition: 'rainy' },
      { day: 'Sat', temp: 18, condition: 'cloudy' },
    ]
  });

  const [activities, setActivities] = useState<Activity[]>([
    { id: '1', title: 'Harvest Wheat', field: 'North Field', dueDate: '2025-07-22', priority: 'high', completed: false },
    { id: '2', title: 'Apply Fertilizer', field: 'South Field', dueDate: '2025-07-18', priority: 'medium', completed: false },
    { id: '3', title: 'Irrigate Corn', field: 'West Field', dueDate: '2025-07-17', priority: 'low', completed: true },
  ]);

  const [alerts, setAlerts] = useState([
    { id: '1', title: 'Low Stock: Fertilizer', message: 'Order more phosphate fertilizer', type: 'warning' },
    { id: '2', title: 'Weather Alert', message: 'Expected heavy rain on Thursday', type: 'info' },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    
    // Simulate fetching fresh data
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  // Get weather condition icon
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun size={24} color="#FF9800" />;
      case 'cloudy':
        return <Cloud size={24} color="#78909C" />;
      case 'rainy':
        return <CloudRain size={24} color="#42A5F5" />;
      case 'partly-cloudy':
        return <Cloud size={24} color="#BDBDBD" />;
      default:
        return <Sun size={24} color="#FF9800" />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Farm Dashboard" />
      
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Weather Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weather</Text>
          <WeatherCard weather={weather} />
          
          <View style={styles.forecastContainer}>
            {weather.forecast.map((day, index) => (
              <View key={index} style={styles.forecastDay}>
                <Text style={styles.forecastDayText}>{day.day}</Text>
                {getWeatherIcon(day.condition)}
                <Text style={styles.forecastTemp}>{day.temp}°</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tasks Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Tasks</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {activities.filter(activity => !activity.completed).slice(0, 3).map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </View>

        {/* Alerts Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alerts</Text>
          {alerts.map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </View>

        {/* Farm Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Farm Overview</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, {backgroundColor: '#E8F5E9'}]}>
                <Sprout size={20} color="#4CAF50" />
              </View>
              <Text style={styles.statValue}>6</Text>
              <Text style={styles.statLabel}>Active Crops</Text>
            </View>
            
            <View style={styles.statItem}>
              <View style={[styles.statIcon, {backgroundColor: '#E1F5FE'}]}>
                <Calendar size={20} color="#039BE5" />
              </View>
              <Text style={styles.statValue}>8</Text>
              <Text style={styles.statLabel}>Tasks</Text>
            </View>
            
            <View style={styles.statItem}>
              <View style={[styles.statIcon, {backgroundColor: '#FFF3E0'}]}>
                <AlertTriangle size={20} color="#FF9800" />
              </View>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Alerts</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F9FB',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  forecastContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  forecastDay: {
    alignItems: 'center',
  },
  forecastDayText: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 8,
  },
  forecastTemp: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212121',
  },
  statLabel: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
  },
});