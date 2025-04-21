import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TriangleAlert as AlertTriangle, Info, X } from 'lucide-react-native';

type AlertCardProps = {
  alert: {
    id: string;
    title: string;
    message: string;
    type: 'warning' | 'error' | 'info' | 'success';
  };
};

export default function AlertCard({ alert }: AlertCardProps) {
  // Get alert styles based on type
  const getAlertStyles = () => {
    switch (alert.type) {
      case 'warning':
        return {
          container: styles.warningContainer,
          icon: <AlertTriangle size={24} color="#FF9800" />,
        };
      case 'error':
        return {
          container: styles.errorContainer,
          icon: <AlertTriangle size={24} color="#F44336" />,
        };
      case 'info':
        return {
          container: styles.infoContainer,
          icon: <Info size={24} color="#2196F3" />,
        };
      case 'success':
        return {
          container: styles.successContainer,
          icon: <Info size={24} color="#4CAF50" />,
        };
      default:
        return {
          container: styles.infoContainer,
          icon: <Info size={24} color="#2196F3" />,
        };
    }
  };

  const alertStyles = getAlertStyles();

  return (
    <View style={[styles.card, alertStyles.container]}>
      <View style={styles.iconContainer}>
        {alertStyles.icon}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{alert.title}</Text>
        <Text style={styles.message}>{alert.message}</Text>
      </View>
      
      <TouchableOpacity style={styles.dismissButton}>
        <X size={18} color="#757575" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  warningContainer: {
    backgroundColor: '#FFF8E1',
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
  },
  infoContainer: {
    backgroundColor: '#E3F2FD',
  },
  successContainer: {
    backgroundColor: '#E8F5E9',
  },
  iconContainer: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 2,
  },
  message: {
    fontSize: 14,
    color: '#616161',
  },
  dismissButton: {
    padding: 4,
  },
});