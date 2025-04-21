import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CircleCheck as CheckCircle2 } from 'lucide-react-native';

// Types
import { Activity } from '@/types/activity';

type ActivityCardProps = {
  activity: Activity;
};

export default function ActivityCard({ activity }: ActivityCardProps) {
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get priority style
  const getPriorityStyle = () => {
    switch (activity.priority) {
      case 'high':
        return styles.highPriority;
      case 'medium':
        return styles.mediumPriority;
      case 'low':
        return styles.lowPriority;
      default:
        return styles.mediumPriority;
    }
  };

  return (
    <View style={[styles.card, activity.completed && styles.completedCard]}>
      <View style={styles.leftContent}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, activity.completed && styles.completedTitle]}>
            {activity.title}
          </Text>
          <View style={[styles.priorityBadge, getPriorityStyle()]}>
            <Text style={styles.priorityText}>{activity.priority}</Text>
          </View>
        </View>
        
        <Text style={styles.fieldText}>{activity.field}</Text>
        
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>Due: {formatDate(activity.dueDate)}</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.checkButton}>
        <CheckCircle2 
          size={24} 
          color={activity.completed ? "#4CAF50" : "#E0E0E0"} 
          fill={activity.completed ? "#4CAF50" : "none"}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  completedCard: {
    backgroundColor: '#F5F5F5',
  },
  leftContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginRight: 8,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#9E9E9E',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  highPriority: {
    backgroundColor: '#FFEBEE',
  },
  mediumPriority: {
    backgroundColor: '#FFF8E1',
  },
  lowPriority: {
    backgroundColor: '#E8F5E9',
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#616161',
  },
  fieldText: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  dateContainer: {
    marginTop: 4,
  },
  dateText: {
    fontSize: 13,
    color: '#9E9E9E',
  },
  checkButton: {
    padding: 8,
  },
});