import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

// Types
import { Task } from '@/types/task';

type CalendarViewProps = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  tasks: Task[];
};

export default function CalendarView({ selectedDate, onDateChange, tasks }: CalendarViewProps) {
  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const currentDate = new Date();
  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth();
  
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Navigate to previous month
  const handlePrevMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(currentMonth - 1);
    onDateChange(newDate);
  };
  
  // Navigate to next month
  const handleNextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(currentMonth + 1);
    onDateChange(newDate);
  };

  // Select a specific day
  const handleSelectDay = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    onDateChange(newDate);
  };

  // Check if a date has tasks
  const hasTasksOnDate = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return tasks.some(task => task.date === dateStr);
  };

  // Generate days for the calendar
  const generateCalendarDays = () => {
    const days = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = 
        currentDate.getDate() === day && 
        currentDate.getMonth() === currentMonth && 
        currentDate.getFullYear() === currentYear;
      
      const isSelected = 
        selectedDate.getDate() === day && 
        selectedDate.getMonth() === currentMonth && 
        selectedDate.getFullYear() === currentYear;
      
      const hasTasks = hasTasksOnDate(day);
      
      days.push(
        <TouchableOpacity 
          key={`day-${day}`} 
          style={[
            styles.dayCell,
            isSelected && styles.selectedDay,
            isToday && styles.today,
          ]}
          onPress={() => handleSelectDay(day)}
        >
          <Text style={[
            styles.dayText,
            isSelected && styles.selectedDayText,
            isToday && styles.todayText,
          ]}>
            {day}
          </Text>
          {hasTasks && <View style={styles.taskDot} />}
        </TouchableOpacity>
      );
    }
    
    return days;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <ChevronLeft size={24} color="#616161" />
        </TouchableOpacity>
        
        <Text style={styles.monthText}>
          {monthNames[currentMonth]} {currentYear}
        </Text>
        
        <TouchableOpacity onPress={handleNextMonth}>
          <ChevronRight size={24} color="#616161" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.daysHeader}>
        {dayNames.map((day, index) => (
          <Text key={index} style={styles.dayName}>
            {day}
          </Text>
        ))}
      </View>
      
      <View style={styles.calendarGrid}>
        {generateCalendarDays()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
  },
  daysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  dayName: {
    width: 36,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    color: '#757575',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  dayText: {
    fontSize: 14,
    color: '#212121',
  },
  today: {
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 20,
  },
  todayText: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  selectedDay: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
  },
  selectedDayText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  taskDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#F44336',
    marginTop: 2,
  },
});