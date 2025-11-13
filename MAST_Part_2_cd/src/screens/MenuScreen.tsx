import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MenuItemCard from '../components/MenuItemCard';
import { MenuItem } from '../types';

type MenuScreenProps = {
  menuItems: MenuItem[];
  onDeleteItem: (id: string) => void;
};

const MenuScreen: React.FC<MenuScreenProps> = ({ menuItems, onDeleteItem }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chef’s Menu</Text>
      <ScrollView>
        {menuItems.length === 0 ? (
          <Text style={styles.emptyText}>No menu items added yet.</Text>
        ) : (
          menuItems.map(item => (
            <MenuItemCard
              key={item.id}
              dishName={item.dishName}
              description={item.description}
              price={item.price}
              onDelete={() => onDeleteItem(item.id)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1A1A1A',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
});

export default MenuScreen;