import React, { useState } from 'react';
import {StyleSheet, Text, View, Pressable, SafeAreaView, ImageBackground, TextInput, ScrollView, Alert,} from 'react-native';

// Type for menu items
type MenuItem = {
  id: string;
  dishName: string;
  description: string;
  course: string;
  price: number;
};

export default function App(): React.ReactElement {
  const [mealName, setMealName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [showMenu, setShowMenu] = useState<boolean>(false); // toggles screens

  const courses: string[] = ['Starters', 'Mains', 'Dessert'];

  // Add new menu item
  const addMenuItem = (): void => {
    if (!mealName.trim() || !description.trim() || !selectedCourse || !price) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }

    const newItem: MenuItem = {
      id: Date.now().toString(),
      dishName: mealName.trim(),
      description: description.trim(),
      course: selectedCourse,
      price: parsedPrice,
    };

    setMenuItems([...menuItems, newItem]);
    setMealName('');
    setDescription('');
    setPrice('');
    setSelectedCourse('');
    Alert.alert('Success', 'Menu item added!');
  };

  // Delete a menu item
  const deleteMenuItem = (id: string): void => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  return (
    <ImageBackground source={require('./assets/snap.jpg')} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.appTitle}>
              A Taste With <Text style={styles.goldText}>Chef Christoffel</Text>
            </Text>
            <Text style={styles.subtitle}>
              {showMenu
                ? 'View the delicious menu below'
                : 'Add your preferred dish to the menu'}
            </Text>
          </View>

          {/* Toggle Button */}
          <Pressable
            style={[styles.switchButton, { backgroundColor: showMenu ? '#444' : '#FFD700' }]}
            onPress={() => setShowMenu(!showMenu)}
          >
            <Text style={[styles.switchButtonText, { color: showMenu ? '#FFD700' : '#000' }]}>
              {showMenu ? 'Back to Add Form' : 'View Chef’s Menu'}
            </Text>
          </Pressable>

          {/* Conditional Rendering */}
          {showMenu ? (
            // Menu Screen
            <View style={styles.menuContainer}>
              <Text style={styles.menuTitle}>Chef’s Menu</Text>
              {menuItems.length === 0 ? (
                <Text style={styles.emptyText}>No menu items added yet.</Text>
              ) : (
                menuItems.map(item => (
                  <View key={item.id} style={styles.menuItem}>
                    <View style={styles.menuItemHeader}>
                      <Text style={styles.dishName}>{item.dishName}</Text>
                      <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
                    </View>
                    <Text style={styles.course}>Course: {item.course}</Text>
                    <Text style={styles.description}>{item.description}</Text>

                    <Pressable style={styles.deleteButton} onPress={() => deleteMenuItem(item.id)}>
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </Pressable>
                  </View>
                ))
              )}
            </View>
          ) : (
            // Add Form Screen
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Add A New Menu Item</Text>

              <Text style={styles.label}>Dish Name:</Text>
              <TextInput
                style={styles.input}
                value={mealName}
                onChangeText={setMealName}
                placeholder="Enter dish name"
                placeholderTextColor="#999"
              />

              <Text style={styles.label}>Description:</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter description"
                placeholderTextColor="#999"
                multiline
              />

              <Text style={styles.label}>Course:</Text>
              <View style={styles.courseContainer}>
                {courses.map(course => (
                  <Pressable
                    key={course}
                    style={[
                      styles.courseButton,
                      selectedCourse === course && styles.courseButtonSelected,
                    ]}
                    onPress={() => setSelectedCourse(course)}
                  >
                    <Text
                      style={[
                        styles.courseButtonText,
                        selectedCourse === course && styles.courseButtonTextSelected,
                      ]}
                    >
                      {course}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Text style={styles.label}>Price (R):</Text>
              <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder="Enter price (e.g. 100.00)"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />

              <Pressable style={styles.addButton} onPress={addMenuItem}>
                <Text style={styles.addButtonText}>Add to Menu</Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  scrollView: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  goldText: {
    color: '#FFD700',
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
  },
  switchButton: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  switchButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#fff',
  },
  input: {
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#fff',
    marginBottom: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  courseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  courseButton: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#444',
    marginHorizontal: 4,
  },
  courseButtonSelected: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  courseButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  courseButtonTextSelected: {
    color: '#000',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#FFD700',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuContainer: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 12,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  menuItem: {
    backgroundColor: '#2A2A2A',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  menuItemHeader: {
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
  course: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
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
  emptyText: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
});

