import React, { useEffect, useState } from 'react';
import {StyleSheet,Text,View,Pressable,SafeAreaView,ImageBackground,TextInput,ScrollView,Alert,} from 'react-native';

// Type for menu items
type MenuItem = {
    id: string;
    dishName: string;
    description: string;
    course: string;
    price: number;
};

let globalMenuItems: MenuItem[] = [
  { id: '1', dishName: 'Tomato Bruschetta', description: 'Grilled bread topped with fresh tomato and basil.', course: 'Starters', price: 55 },
  { id: '2', dishName: 'Seared Salmon', description: 'Pan seared salmon with lemon butter.', course: 'Mains', price: 165 },
  { id: '3', dishName: 'Chocolate Mousse', description: 'Light and airy chocolate mousse.', course: 'Dessert', price: 70 },
];

function addGlobalMenuItem(item: MenuItem) {
  globalMenuItems.push(item);
}

function deleteGlobalMenuItemById(id: string) {
  globalMenuItems = globalMenuItems.filter(i => i.id !== id);
}

function updateGlobalMenuItem(updated: MenuItem) {
  for (let i = 0; i < globalMenuItems.length; i++) {
    if (globalMenuItems[i].id === updated.id) {
      globalMenuItems[i] = updated;
      break;
    }
  }
}

function getGlobalMenuItems(): MenuItem[] {
  return [...globalMenuItems];
}

// AddMenuScreen component moved outside of App
function AddMenuScreen({onDone, refreshHome}: {onDone: () => void; refreshHome: () => void}) {
  const courses: string[] = ['Starters', 'Mains', 'Dessert'];
  const [mealName, setMealName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [items, setItems] = useState<MenuItem[]>(getGlobalMenuItems());

  useEffect(() => {
    setItems(getGlobalMenuItems());
  }, []);

  function resetForm() {
    setMealName('');
    setDescription('');
    setPrice('');
    setSelectedCourse('');
    setEditingId(null);
  }

  function validateForm(): boolean {
    if (!mealName.trim()) { Alert.alert('Error', 'Please enter a dish name'); return false; }
    if (!description.trim()) { Alert.alert('Error', 'Please enter a description'); return false; }
    if (!selectedCourse) { Alert.alert('Error', 'Please select a course'); return false; }
    const parsedPrice = parseFloat(price);
    if (!price || isNaN(parsedPrice) || parsedPrice <= 0) { Alert.alert('Error', 'Please enter a valid price'); return false; }
    return true;
  }

  function handleAddOrUpdate() {
    if (!validateForm()) return;
    const parsedPrice = parseFloat(price);
    if (editingId) {
      const updated: MenuItem = { id: editingId, dishName: mealName.trim(), description: description.trim(), course: selectedCourse, price: parsedPrice };
      updateGlobalMenuItem(updated);
      setItems(getGlobalMenuItems());
      Alert.alert('Success', 'Menu item updated');
    } else {
      const newItem: MenuItem = { id: Date.now().toString(), dishName: mealName.trim(), description: description.trim(), course: selectedCourse, price: parsedPrice };
      addGlobalMenuItem(newItem);
      setItems(getGlobalMenuItems());
      Alert.alert('Success', 'Menu item added');
    }
    resetForm();
    refreshHome();
  }

  function handleEdit(item: MenuItem) {
    setEditingId(item.id);
    setMealName(item.dishName);
    setDescription(item.description);
    setPrice(item.price.toString());
    setSelectedCourse(item.course);
  }

  function handleDelete(id: string) {
    deleteGlobalMenuItemById(id);
    setItems(getGlobalMenuItems());
    refreshHome();
  }

  return (
    <View style={styles.formContainer}>
      <View style={styles.menuPageHeader}>
        <Text style={styles.formTitle}>{editingId ? 'Edit Menu Item' : 'Add New Menu Item'}</Text>
        <Pressable style={styles.backButton} onPress={onDone}><Text style={styles.backButtonText}>Back</Text></Pressable>
      </View>

      <Text style={styles.label}>Dish Name:</Text>
      <TextInput style={styles.input} value={mealName} onChangeText={setMealName} placeholder="Enter your preferred dish name" placeholderTextColor="#999" />

      <Text style={styles.label}>Description:</Text>
      <TextInput style={[styles.input, styles.textArea]} value={description} onChangeText={setDescription} placeholder="Enter meal description" placeholderTextColor="#999" multiline />

      <Text style={styles.label}>Course:</Text>
      <View style={styles.courseContainer}>
        {courses.map(course => (
          <Pressable key={course} style={[styles.courseButton, selectedCourse === course && styles.courseButtonSelected]} onPress={() => setSelectedCourse(course)}>
            <Text style={[styles.courseButtonText, selectedCourse === course && styles.courseButtonTextSelected]}>{course}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Price (R):</Text>
      <TextInput style={styles.input} value={price} onChangeText={setPrice} placeholder="Enter price (e.g. 100.00)" placeholderTextColor="#999" keyboardType="numeric" />

      <Pressable style={styles.addButton} onPress={handleAddOrUpdate}>
        <Text style={styles.addButtonText}>{editingId ? 'Update Item' : 'Add to Menu'}</Text>
      </Pressable>

      <Text style={[styles.menuTitle, {marginTop: 16}]}>Existing Items</Text>
      {items.length === 0 ? (
        <Text style={styles.emptyText}>No items</Text>
      ) : (
        items.map(it => (
          <View key={it.id} style={styles.menuItem}>
            <View style={styles.menuItemHeader}>
              <Text style={styles.dishName}>{it.dishName}</Text>
              <Text style={styles.price}>R{it.price.toFixed(2)}</Text>
            </View>
            <Text style={styles.course}>Course: {it.course}</Text>
            <Text style={styles.description}>{it.description}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Pressable style={[styles.deleteButton, {marginRight: 8}]} onPress={() => handleEdit(it)}><Text style={styles.deleteButtonText}>Edit</Text></Pressable>
              <Pressable style={styles.deleteButton} onPress={() => handleDelete(it.id)}><Text style={styles.deleteButtonText}>Delete</Text></Pressable>
            </View>
          </View>
        ))
      )}
    </View>
  );
}

// Main App component
export default function App(): React.ReactElement {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(getGlobalMenuItems());
  const [screen, setScreen] = useState<'home' | 'add'>('home');
  const courses: string[] = ['Starters', 'Mains', 'Dessert'];

  useEffect(() => {
    setMenuItems(getGlobalMenuItems());
  }, [screen]);

  function computeTotalItems(): number {
    let total = 0;
    const items = getGlobalMenuItems();
    for (let i = 0; i < items.length; i++) {
      total += 1;
    }
    return total;
  }

  function computeAveragePricePerCourse(): {[course: string]: number} {
    const acc: {[key: string]: {sum: number; count: number}} = {};
    
    for (let i = 0; i < courses.length; i++) {
      acc[courses[i]] = {sum: 0, count: 0};
    }

    const items = getGlobalMenuItems();
    let idx = 0;
    while (idx < items.length) {
      const it = items[idx];
      if (acc[it.course]) {
        acc[it.course].sum += it.price;
        acc[it.course].count += 1;
      }
      idx++;
    }

    const averages: {[course: string]: number} = {};
    for (const key in acc) {
      const {sum, count} = acc[key];
      averages[key] = count === 0 ? 0 : Math.round((sum / count) * 100) / 100;
    }
    return averages;
  }

  function removeItem(id: string) {
    deleteGlobalMenuItemById(id);
    setMenuItems(getGlobalMenuItems());
  }

  function goToAddScreen() {
    setScreen('add');
  }

  function goToHomeScreen() {
    setScreen('home');
    setMenuItems(getGlobalMenuItems());
  }

  const averages = computeAveragePricePerCourse();
  const totalItems = computeTotalItems();

  return (
    <ImageBackground
      source={require('./assets/snap.jpg')}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.appTitle}>
              A Taste With <Text style={styles.goldText}>Chef Christoffel</Text>
            </Text>
            <Text style={styles.subtitle}>Select your preferred course/meal</Text>
          </View>

          <View style={styles.statsContainer}>
            <Text style={styles.statText}>Total menu items: {totalItems}</Text>
            <Text style={styles.statText}>Average price by course:</Text>
            {courses.map(c => (
              <Text key={c} style={styles.avgText}>
                {c}: R{averages[c] !== undefined ? averages[c].toFixed(2) : '0.00'}
              </Text>
            ))}
          </View>

          <View style={styles.menuContainer}>
            <Text style={styles.menuTitle}>Chef's Menu</Text>
            <Pressable style={styles.viewMenuButton} onPress={goToAddScreen}>
              <Text style={styles.viewMenuButtonText}>Go to Add / Manage Items</Text>
            </Pressable>

            <View style={{marginTop: 12}}>
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

                    <Pressable style={styles.deleteButton} onPress={() => removeItem(item.id)}>
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </Pressable>
                  </View>
                ))
              )}
            </View>
          </View>

          {screen === 'add' && (
            <AddMenuScreen onDone={goToHomeScreen} refreshHome={() => setMenuItems(getGlobalMenuItems())} />
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

// Styles reused from previous file
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
  menuPageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  backButton: {
    backgroundColor: '#444',
    padding: 8,
    borderRadius: 6,
  },
  backButtonText: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  statsContainer: {
    backgroundColor: '#1A1A1A',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  statText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
  avgText: {
    color: '#FFD700',
    fontSize: 14,
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
  viewMenuButton: {
    backgroundColor: '#FFD700',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  viewMenuButtonText: {
    color: '#000',
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

