import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

type MenuItemCardProps = {
  dishName: string;
  description: string;
  price: number;
  onDelete: () => void;
};

const MenuItemCard: React.FC<MenuItemCardProps> = ({ dishName, description, price, onDelete }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.dishName}>{dishName}</Text>
        <Text style={styles.price}>R{price.toFixed(2)}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
      <Pressable style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2A2A2A',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  description: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  deleteButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#8B0000',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MenuItemCard;