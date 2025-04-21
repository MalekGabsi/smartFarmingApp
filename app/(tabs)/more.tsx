import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Cog as Cow, Package, BookOpen, Settings, CircleUser as UserCircle, CircleHelp as HelpCircle, ArrowRight, Bell, ThermometerSun, ShieldCheck, Map } from 'lucide-react-native';

// Components
import Header from '@/components/Header';

export default function More() {
  const menuItems = [
    {
      title: 'Livestock',
      icon: <Cow size={24} color="#8D6E63" />,
      description: 'Manage your livestock',
      screen: 'livestock',
    },
    {
      title: 'Inventory',
      icon: <Package size={24} color="#5D4037" />,
      description: 'Manage farm supplies',
      screen: 'inventory',
    },
    {
      title: 'Weather',
      icon: <ThermometerSun size={24} color="#FF9800" />,
      description: 'Detailed weather forecast',
      screen: 'weather',
    },
    {
      title: 'Field Map',
      icon: <Map size={24} color="#2E7D32" />,
      description: 'View farm map',
      screen: 'map',
    },
    {
      title: 'Knowledge Base',
      icon: <BookOpen size={24} color="#1976D2" />,
      description: 'Agricultural guides and tips',
      screen: 'knowledge',
    },
  ];

  const accountItems = [
    {
      title: 'Farm Profile',
      icon: <UserCircle size={24} color="#616161" />,
    },
    {
      title: 'Notifications',
      icon: <Bell size={24} color="#616161" />,
    },
    {
      title: 'Settings',
      icon: <Settings size={24} color="#616161" />,
    },
    {
      title: 'Help & Support',
      icon: <HelpCircle size={24} color="#616161" />,
    },
    {
      title: 'Privacy & Security',
      icon: <ShieldCheck size={24} color="#616161" />,
    },
  ];

  const handleNavigate = (screen: string) => {
    // Navigate to selected screen
    // This would be implemented with Expo Router
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="More" />
      
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Farm Management</Text>
          
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.menuItem}
              onPress={() => handleNavigate(item.screen)}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.iconContainer}>
                  {item.icon}
                </View>
                <View>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemDescription}>{item.description}</Text>
                </View>
              </View>
              <ArrowRight size={20} color="#BDBDBD" />
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          {accountItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.iconContainer, styles.accountIconContainer]}>
                  {item.icon}
                </View>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
              </View>
              <ArrowRight size={20} color="#BDBDBD" />
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.footerContainer}>
          <Text style={styles.version}>Version 1.0.0</Text>
          <TouchableOpacity>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  accountIconContainer: {
    backgroundColor: '#EEEEEE',
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
  },
  footerContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  version: {
    fontSize: 14,
    color: '#9E9E9E',
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 16,
    color: '#F44336',
    fontWeight: '600',
  },
});