import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Circle, CircleCheck as CheckCircle2, MapPin } from 'lucide-react-native';

// Types
import { Task } from '@/types/task';

type TaskItemProps = {
  task: Task;
  onToggleComplete: () => void;
};

export default function TaskItem({ task, onToggleComplete }: TaskItemProps) {
  // Get category style and icon
  const getCategoryStyle = () => {
    switch (task.category) {
      case 'harvest':
        return {
          color: '#F57C00',
          bgColor: '#FFF3E0',
        };
      case 'fertilizer':
        return {
          color: '#388E3C',
          bgColor: '#E8F5E9',
        };
      case 'irrigation':
        return {
          color: '#1976D2',
          bgColor: '#E3F2FD',
        };
      case 'maintenance':
        return {
          color: '#5D4037',
          bgColor: '#EFEBE9',
        };
      default:
        return {
          color: '#757575',
          bgColor: '#F5F5F5',
        };
    }
  };

  // Get priority style
  const getPriorityStyle = () => {
    switch (task.priority) {
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

  const categoryStyle = getCategoryStyle();

  return (
    <View style={[styles.card, task.completed && styles.completedCard]}>
      <TouchableOpacity 
        style={styles.checkbox}
        onPress={onToggleComplete}
      >
        {task.completed ? (
          <CheckCircle2 size={24} color="#4CAF50" />
        ) : (
          <Circle size={24} color="#BDBDBD" />
        )}
      </TouchableOpacity>
      
      <View style={styles.content}>
        <Text 
          style={[
            styles.title, 
            task.completed && styles.completedTitle
          ]}
        >
          {task.title}
        </Text>
        
        {task.description && (
          <Text style={styles.description}>{task.description}</Text>
        )}
        
        <View style={styles.detailsRow}>
          <View style={[styles.categoryBadge, { backgroundColor: categoryStyle.bgColor }]}>
            <Text style={[styles.categoryText, { color: categoryStyle.color }]}>
              {task.category}
            </Text>
          </View>
          
          <View style={styles.fieldContainer}>
            <MapPin size={12} color="#757575" />
            <Text style={styles.fieldText}>{task.field}</Text>
          </View>
          
          <View style={[styles.priorityBadge, getPriorityStyle()]}>
            <Text style={styles.priorityText}>
              {task.priority}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
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
  checkbox: {
    marginRight: 12,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#9E9E9E',
  },
  description: {
    fontSize: 14,
    color: '#616161',
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 4,
  },
  fieldText: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 4,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 4,
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
});