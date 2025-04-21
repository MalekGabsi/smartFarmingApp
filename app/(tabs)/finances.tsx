import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PiggyBank, ArrowDownRight, ArrowUpRight, Filter, Calendar } from 'lucide-react-native';

// Components
import Header from '@/components/Header';
import TransactionItem from '@/components/finances/TransactionItem';
import ChartSection from '@/components/finances/ChartSection';

// Types
import { Transaction } from '@/types/transaction';

export default function Finances() {
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month' | 'year'>('month');
  
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      title: 'Corn sale',
      amount: 5280,
      type: 'income',
      category: 'sales',
      date: '2025-07-15',
    },
    {
      id: '2',
      title: 'Fertilizer purchase',
      amount: 840,
      type: 'expense',
      category: 'supplies',
      date: '2025-07-12',
    },
    {
      id: '3',
      title: 'Equipment repair',
      amount: 350,
      type: 'expense',
      category: 'maintenance',
      date: '2025-07-10',
    },
    {
      id: '4',
      title: 'Wheat sale',
      amount: 3750,
      type: 'income',
      category: 'sales',
      date: '2025-07-08',
    },
    {
      id: '5',
      title: 'Irrigation system',
      amount: 1200,
      type: 'expense',
      category: 'equipment',
      date: '2025-07-05',
    },
  ]);

  // Calculate summary
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
    
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
    
  const balance = income - expenses;

  const renderItem = ({ item }: { item: Transaction }) => (
    <TransactionItem transaction={item} />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Farm Finances" />
      
      <ScrollView style={styles.container}>
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={[styles.summaryCard, styles.balanceCard]}>
            <Text style={styles.summaryLabel}>Balance</Text>
            <Text style={styles.balanceValue}>${balance.toLocaleString()}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <View style={[styles.summaryCard, styles.incomeCard]}>
              <View style={styles.summaryHeader}>
                <Text style={styles.summaryLabel}>Income</Text>
                <ArrowUpRight size={16} color="#4CAF50" />
              </View>
              <Text style={styles.incomeValue}>${income.toLocaleString()}</Text>
            </View>
            
            <View style={[styles.summaryCard, styles.expenseCard]}>
              <View style={styles.summaryHeader}>
                <Text style={styles.summaryLabel}>Expenses</Text>
                <ArrowDownRight size={16} color="#F44336" />
              </View>
              <Text style={styles.expenseValue}>${expenses.toLocaleString()}</Text>
            </View>
          </View>
        </View>
        
        {/* Period Selector */}
        <View style={styles.periodSelector}>
          <TouchableOpacity 
            style={[styles.periodButton, selectedPeriod === 'day' && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod('day')}
          >
            <Text style={[styles.periodButtonText, selectedPeriod === 'day' && styles.periodButtonTextActive]}>Day</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.periodButton, selectedPeriod === 'week' && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod('week')}
          >
            <Text style={[styles.periodButtonText, selectedPeriod === 'week' && styles.periodButtonTextActive]}>Week</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.periodButton, selectedPeriod === 'month' && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod('month')}
          >
            <Text style={[styles.periodButtonText, selectedPeriod === 'month' && styles.periodButtonTextActive]}>Month</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.periodButton, selectedPeriod === 'year' && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod('year')}
          >
            <Text style={[styles.periodButtonText, selectedPeriod === 'year' && styles.periodButtonTextActive]}>Year</Text>
          </TouchableOpacity>
        </View>
        
        {/* Chart Section */}
        <ChartSection period={selectedPeriod} />
        
        {/* Recent Transactions */}
        <View style={styles.transactionsContainer}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.transactionsTitle}>Recent Transactions</Text>
            
            <View style={styles.transactionsActions}>
              <TouchableOpacity style={styles.iconButton}>
                <Filter size={16} color="#616161" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.iconButton}>
                <Calendar size={16} color="#616161" />
              </TouchableOpacity>
            </View>
          </View>
          
          {transactions.map(transaction => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
          
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All Transactions</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <View style={styles.actionButtonContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Add Transaction</Text>
        </TouchableOpacity>
      </View>
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
  summaryContainer: {
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  balanceCard: {
    marginBottom: 12,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#757575',
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#212121',
    marginTop: 8,
  },
  incomeValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4CAF50',
  },
  expenseValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F44336',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  incomeCard: {
    flex: 1,
    marginRight: 6,
  },
  expenseCard: {
    flex: 1,
    marginLeft: 6,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
    marginBottom: 16,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  periodButtonText: {
    fontSize: 14,
    color: '#616161',
  },
  periodButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  transactionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
  },
  transactionsActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  viewAllButton: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  viewAllText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  actionButtonContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});