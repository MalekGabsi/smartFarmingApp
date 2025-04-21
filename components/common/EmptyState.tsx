import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Map, Package, Calendar, BookOpen, Cog as Cow } from 'lucide-react-native';

type EmptyStateProps = {
  message: string;
  actionLabel: string;
  onAction: () => void;
  icon: 'map' | 'inventory' | 'calendar' | 'knowledge' | 'livestock';
};

export default function EmptyState({ message, actionLabel, onAction, icon }: EmptyStateProps) {
  const renderIcon = () => {
    switch (icon) {
      case 'map':
        return <Map size={60} color="#BDBDBD" />;
      case 'inventory':
        return <Package size={60} color="#BDBDBD" />;
      case 'calendar':
        return <Calendar size={60} color="#BDBDBD" />;
      case 'knowledge':
        return <BookOpen size={60} color="#BDBDBD" />;
      case 'livestock':
        return <Cow size={60} color="#BDBDBD" />;
      default:
        return <Map size={60} color="#BDBDBD" />;
    }
  };

  return (
    <View style={styles.container}>
      {renderIcon()}
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity style={styles.button} onPress={onAction}>
        <Text style={styles.buttonText}>{actionLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  message: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});