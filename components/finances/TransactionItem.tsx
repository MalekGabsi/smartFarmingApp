import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ArrowDownRight, ArrowUpRight, ShoppingCart, Tag, Wrench, Leaf, Plus } from 'lucide-react-native';

// Types
import { Transaction } from '@/types/transaction';

type TransactionItemProps = {
  transaction: Transaction;
};

export default function TransactionItem({ transaction }: TransactionItemProps) {
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get category icon
  const getCategoryIcon = () => {
    switch (transaction.category) {
      case 'sales':
        return <Tag size={20} color="#4CAF50" />;
      case 'supplies':
        return <ShoppingCart size={20} color="#FF9800" />;
      case 'maintenance':
        return <Wrench size={20} color="#2196F3" />;
      case 'equipment':
        return <Leaf size={20} color="#9C27B0" />;
      default:
        return <Plus size={20} color="#757575" />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {getCategoryIcon()}
      </View>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{transaction.title}</Text>
        <Text style={styles.date}>{formatDate(transaction.date)}</Text>
      </View>
      
      <View style={styles.amountContainer}>
        <View style={styles.amountRow}>
          {transaction.type === 'income' ? (
            <ArrowUpRight size={16} color="#4CAF50" />
          ) : (
            <ArrowDownRight size={16} color="#F44336" />
          )}
          
          <Text 
            style={[
              styles.amount, 
              transaction.type === 'income' ? styles.income : styles.expense
            ]}
          >
            ${transaction.amount.toLocaleString()}
          </Text>
        </View>
        
        <Text style={styles.category}>{transaction.category}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    color: '#212121',
    fontWeight: '500',
  },
  date: {
    fontSize: 13,
    color: '#757575',
    marginTop: 2,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  income: {
    color: '#4CAF50',
  },
  expense: {
    color: '#F44336',
  },
  category: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 2,
  },
});