import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react-native';

// Components
import Header from '@/components/Header';
import TaskItem from '@/components/calendar/TaskItem';
import CalendarView from '@/components/calendar/CalendarView';

// Types
import { Task } from '@/types/task';

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Harvest Wheat',
      description: 'Harvest the wheat crop in the North Field',
      date: '2025-07-22',
      field: 'North Field',
      category: 'harvest',
      priority: 'high',
      completed: false,
    },
    {
      id: '2',
      title: 'Apply Fertilizer',
      description: 'Apply nitrogen fertilizer to corn crops',
      date: '2025-07-18',
      field: 'South Field',
      category: 'fertilizer',
      priority: 'medium',
      completed: false,
    },
    {
      id: '3',
      title: 'Irrigate Corn',
      description: 'Run irrigation system for the corn crops',
      date: '2025-07-17',
      field: 'West Field',
      category: 'irrigation',
      priority: 'high',
      completed: false,
    },
    {
      id: '4',
      title: 'Equipment Maintenance',
      description: 'Service the tractor and harvester',
      date: '2025-07-20',
      field: 'Workshop',
      category: 'maintenance',
      priority: 'medium',
      completed: false,
    },
  ]);

  const [view, setView] = useState<'calendar' | 'list'>('calendar');

  // Format date as yyyy-mm-dd for comparison
  const formatDateForComparison = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  // Filter tasks for the selected date
  const selectedDateTasks = tasks.filter(
    task => task.date === formatDateForComparison(selectedDate)
  );

  const handlePrevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const handleAddTask = () => {
    // Navigate to add task screen
    // This would be implemented with Expo Router
  };

  const handleToggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed } 
        : task
    ));
  };

  const renderItem = ({ item }: { item: Task }) => (
    <TaskItem
      task={item}
      onToggleComplete={() => handleToggleTaskCompletion(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Calendar" />
      
      <View style={styles.calendarContainer}>
        <CalendarView 
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          tasks={tasks}
        />
      </View>
      
      <View style={styles.dayHeader}>
        <TouchableOpacity onPress={handlePrevDay} style={styles.dayNavButton}>
          <ChevronLeft size={20} color="#616161" />
        </TouchableOpacity>
        
        <Text style={styles.selectedDay}>
          {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Text>
        
        <TouchableOpacity onPress={handleNextDay} style={styles.dayNavButton}>
          <ChevronRight size={20} color="#616161" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.tasksContainer}>
        <View style={styles.tasksHeader}>
          <Text style={styles.tasksTitle}>
            Tasks
            {selectedDateTasks.length > 0 && 
              <Text style={styles.taskCount}> ({selectedDateTasks.length})</Text>
            }
          </Text>
          
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddTask}
          >
            <Plus size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        {selectedDateTasks.length > 0 ? (
          <FlatList
            data={selectedDateTasks}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.tasksList}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <CalendarIcon size={48} color="#BDBDBD" />
            <Text style={styles.emptyText}>No tasks for this day</Text>
            <TouchableOpacity 
              style={styles.emptyButton}
              onPress={handleAddTask}
            >
              <Text style={styles.emptyButtonText}>Add Task</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F9FB',
  },
  calendarContainer: {
    paddingHorizontal: 16,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  selectedDay: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  dayNavButton: {
    padding: 8,
  },
  tasksContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  tasksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  tasksTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
  },
  taskCount: {
    fontWeight: '400',
    color: '#757575',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tasksList: {
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#757575',
    marginTop: 12,
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: 'white',
    fontWeight: '600',
  }
});