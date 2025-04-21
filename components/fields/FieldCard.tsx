import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Calendar, Ruler, Cloud } from 'lucide-react-native';

// Types
import { Field } from '@/types/field';

type FieldCardProps = {
  field: Field;
};

export default function FieldCard({ field }: FieldCardProps) {
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{ uri: field.image }}
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>{field.status}</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name}>{field.name}</Text>
        <Text style={styles.cropType}>{field.cropType}</Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Ruler size={16} color="#757575" />
            <Text style={styles.detailText}>{field.size} {field.sizeUnit}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Cloud size={16} color="#757575" />
            <Text style={styles.detailText}>{field.soilType}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Calendar size={16} color="#757575" />
            <Text style={styles.detailText}>
              {formatDate(field.plantingDate)} - {formatDate(field.harvestDate)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 160,
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 4,
  },
  cropType: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4CAF50',
    marginBottom: 12,
  },
  detailsContainer: {
    marginTop: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#616161',
  },
});