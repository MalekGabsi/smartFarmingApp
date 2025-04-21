import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Filter, ArrowUpDown } from 'lucide-react-native';

// Components
import Header from '@/components/Header';
import FieldCard from '@/components/fields/FieldCard';
import EmptyState from '@/components/common/EmptyState';

// Types
import { Field } from '@/types/field';

export default function Fields() {
  const [fields, setFields] = useState<Field[]>([
    {
      id: '1',
      name: 'North Field',
      size: 25,
      sizeUnit: 'ha',
      cropType: 'Wheat',
      soilType: 'Loam',
      plantingDate: '2025-03-15',
      harvestDate: '2025-07-25',
      status: 'active',
      image: 'https://images.pexels.com/photos/33622/wheat-field-wheat-spike-wheat-cultivation.jpg'
    },
    {
      id: '2',
      name: 'South Field',
      size: 18,
      sizeUnit: 'ha',
      cropType: 'Corn',
      soilType: 'Sandy Loam',
      plantingDate: '2025-04-10',
      harvestDate: '2025-09-05',
      status: 'active',
      image: 'https://images.pexels.com/photos/1112080/pexels-photo-1112080.jpeg'
    },
    {
      id: '3',
      name: 'West Field',
      size: 12,
      sizeUnit: 'ha',
      cropType: 'Soybeans',
      soilType: 'Clay',
      plantingDate: '2025-05-20',
      harvestDate: '2025-10-15',
      status: 'active',
      image: 'https://images.pexels.com/photos/1483880/pexels-photo-1483880.jpeg'
    },
  ]);

  const [sortBy, setSortBy] = useState('name');
  const [filterActive, setFilterActive] = useState(false);

  const handleAddField = () => {
    // Navigate to add field screen
    // This would be implemented with Expo Router
  };

  const renderItem = ({ item }: { item: Field }) => (
    <FieldCard field={item} />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="My Fields" />
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleAddField}>
          <Plus size={18} color="#4CAF50" />
          <Text style={styles.actionText}>Add Field</Text>
        </TouchableOpacity>
        
        <View style={styles.actionsRight}>
          <TouchableOpacity 
            style={[styles.iconButton, filterActive && styles.iconButtonActive]} 
            onPress={() => setFilterActive(!filterActive)}
          >
            <Filter size={18} color={filterActive ? "#FFFFFF" : "#616161"} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.iconButton}>
            <ArrowUpDown size={18} color="#616161" />
          </TouchableOpacity>
        </View>
      </View>
      
      {fields.length > 0 ? (
        <FlatList
          data={fields}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyState
          message="You don't have any fields yet"
          actionLabel="Add your first field"
          onAction={handleAddField}
          icon="map"
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F9FB',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  actionsRight: {
    flexDirection: 'row',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionText: {
    color: '#4CAF50',
    fontWeight: '600',
    marginLeft: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  iconButtonActive: {
    backgroundColor: '#4CAF50',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  }
});