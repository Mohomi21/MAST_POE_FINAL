import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { MenuItem } from '../types'; // Assuming MenuItem type is defined in types/index.ts

type AddItemScreenProps = {
  onAddItem: (item: MenuItem) => void;
};

const AddItemScreen: React.FC<AddItemScreenProps> = ({ onAddItem }) => {
  const [mealName, setMealName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string>('');

  const courses: string[] = ['Starters', 'Mains', 'Dessert'];

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

    onAddItem(newItem);
    setMealName('');
    setDescription('');
    setPrice('');
    setSelectedCourse('');
    Alert.alert('Success', 'Menu item added!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add A New Menu Item</Text>

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
            <Text style={[
              styles.courseButtonText,
              selectedCourse === course && styles.courseButtonTextSelected,
            ]}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
  },
  title: {
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
});

export default AddItemScreen;