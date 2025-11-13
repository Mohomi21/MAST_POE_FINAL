import React, { useState, useEffect } from 'react';
import {StyleSheet,  Text,  View,  Pressable,  SafeAreaView,  ImageBackground,  TextInput , ScrollView,  Alert,} from 'react-native';

// Types
type MenuItem = {
  id: string;
  dishName: string;
  description: string;
  course: string;
  price: number;
};

type ScreenType = 'home' | 'add' | 'manage';

// Global variables
const GLOBAL_CONSTANTS = {
  APP_NAME: "A Taste With Chef Christoffel",
  COURSES: ['Starters', 'Mains', 'Dessert'] as const,
  DEFAULT_MENU_ITEMS: [
    {
      id: '1',
      dishName: 'Caprese Salad',
      description: 'Fresh mozzarella, tomatoes, and basil with balsamic glaze',
      course: 'Starters',
      price: 120.00,
    },
    {
      id: '2',
      dishName: 'Grilled Salmon',
      description: 'Atlantic salmon with lemon butter sauce and seasonal vegetables',
      course: 'Mains',
      price: 280.00,
    },
    {
      id: '3',
      dishName: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with molten center and vanilla ice cream',
      course: 'Dessert',
      price: 95.00,
    },
  ],
};

// Global state management
let globalMenuItems: MenuItem[] = [...GLOBAL_CONSTANTS.DEFAULT_MENU_ITEMS];

export default function App(): React.ReactElement {
  // State management
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(globalMenuItems);
  const [filterCourse, setFilterCourse] = useState<string>('All');

  // Sync with global variable using useEffect (demonstrating lifecycle)
  useEffect(() => {
    globalMenuItems = [...menuItems];
  }, [menuItems]);

  // Navigation functions
  const navigateToScreen = (screen: ScreenType): void => {
    setCurrentScreen(screen);
  };

  // Calculation functions
  const calculateTotalMenuItems = (): number => {
    // Using for loop
    let count = 0;
    for (let i = 0; i < menuItems.length; i++) {
      count++;
    }
    return count;
  };

  const calculateAveragePrices = (): { [key: string]: number } => {
    const averages: { [key: string]: number } = {};
    
    // Using for...in loop with course types
    const courses = ['All', ...GLOBAL_CONSTANTS.COURSES];
    for (const course in courses) {
      const courseName = courses[course];
      if (courseName === 'All') continue;
      
      const courseItems = menuItems.filter(item => item.course === courseName);
      if (courseItems.length > 0) {
        // Using while loop for sum calculation
        let total = 0;
        let i = 0;
        while (i < courseItems.length) {
          total += courseItems[i].price;
          i++;
        }
        averages[courseName] = total / courseItems.length;
      } else {
        averages[courseName] = 0;
      }
    }
    
    return averages;
  };

  // Filter functions
  const getFilteredMenuItems = (): MenuItem[] => {
    if (filterCourse === 'All') {
      return menuItems;
    }
    return menuItems.filter(item => item.course === filterCourse);
  };

  // Render functions
  const renderHomeScreen = (): React.ReactElement => {
    const totalItems = calculateTotalMenuItems();
    const averagePrices = calculateAveragePrices();
    const filteredItems = getFilteredMenuItems();

    return (
      <View style={styles.screenContainer}>
        <View style={styles.header}>
          <Text style={styles.appTitle}>
            A Taste With <Text style={styles.goldText}>Chef Christoffel</Text>
          </Text>
          <Text style={styles.subtitle}>Welcome to Your Restaurant Menu</Text>
        </View>

        {/* Statistics Section */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Menu Statistics</Text>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total Menu Items:</Text>
            <Text style={styles.statValue}>{totalItems}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Average Prices:</Text>
            <View style={styles.averagePrices}>
              {GLOBAL_CONSTANTS.COURSES.map(course => (
                <Text key={course} style={styles.averagePriceItem}>
                  {course}: R{averagePrices[course]?.toFixed(2) || '0.00'}
                </Text>
              ))}
            </View>
          </View>
        </View>

        {/* Filter Section */}
        <View style={styles.filterContainer}>
          <Text style={styles.filterTitle}>Filter by Course:</Text>
          <View style={styles.filterButtons}>
            {['All', ...GLOBAL_CONSTANTS.COURSES].map(course => (
              <Pressable
                key={course}
                style={[
                  styles.filterButton,
                  filterCourse === course && styles.filterButtonActive,
                ]}
                onPress={() => setFilterCourse(course)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    filterCourse === course && styles.filterButtonTextActive,
                  ]}
                >
                  {course}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Menu Items Display */}
        <View style={styles.menuDisplay}>
          <Text style={styles.menuTitle}>
            {filterCourse === 'All' ? 'Complete Menu' : `${filterCourse} Menu`}
          </Text>
          {filteredItems.length === 0 ? (
            <Text style={styles.emptyText}>No menu items found.</Text>
          ) : (
            <ScrollView style={styles.menuScrollView}>
              {filteredItems.map(item => (
                <View key={item.id} style={styles.menuItemCard}>
                  <View style={styles.menuItemHeader}>
                    <Text style={styles.dishName}>{item.dishName}</Text>
                    <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
                  </View>
                  <Text style={styles.courseBadge}>{item.course}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    );
  };

  const renderAddScreen = (): React.ReactElement => {
    return <AddMenuItemScreen onMenuUpdate={setMenuItems} />;
  };

  const renderManageScreen = (): React.ReactElement => {
    return <ManageMenuScreen 
      menuItems={menuItems} 
      onMenuUpdate={setMenuItems} 
    />;
  };

  return (
    <ImageBackground
      source={require('./assets/snap.jpg')}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        {/* Main Content */}
        <View style={styles.content}>
          {currentScreen === 'home' && renderHomeScreen()}
          {currentScreen === 'add' && renderAddScreen()}
          {currentScreen === 'manage' && renderManageScreen()}
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNavigation}>
          <Pressable
            style={[
              styles.navButton,
              currentScreen === 'home' && styles.navButtonActive,
            ]}
            onPress={() => navigateToScreen('home')}
          >
            <Text
              style={[
                styles.navButtonText,
                currentScreen === 'home' && styles.navButtonTextActive,
              ]}
            >
              Home
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.navButton,
              currentScreen === 'add' && styles.navButtonActive,
            ]}
            onPress={() => navigateToScreen('add')}
          >
            <Text
              style={[
                styles.navButtonText,
                currentScreen === 'add' && styles.navButtonTextActive,
              ]}
            >
              Add Item
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.navButton,
              currentScreen === 'manage' && styles.navButtonActive,
            ]}
            onPress={() => navigateToScreen('manage')}
          >
            <Text
              style={[
                styles.navButtonText,
                currentScreen === 'manage' && styles.navButtonTextActive,
              ]}
            >
              Manage Menu
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

// Add Menu Item Screen Component
const AddMenuItemScreen = ({ onMenuUpdate }: { onMenuUpdate: (items: MenuItem[]) => void }): React.ReactElement => {
  const [mealName, setMealName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string>('');

  const addMenuItem = (): void => {
    // Validation using multiple conditions
    if (!mealName.trim()) {
      showAlert('Error', 'Please enter a dish name');
      return;
    }
    if (!description.trim()) {
      showAlert('Error', 'Please enter a description');
      return;
    }
    if (!selectedCourse) {
      showAlert('Error', 'Please select a course');
      return;
    }
    
    const parsedPrice = parseFloat(price);
    if (!price || isNaN(parsedPrice) || parsedPrice <= 0) {
      showAlert('Error', 'Please enter a valid price');
      return;
    }

    const newItem: MenuItem = {
      id: Date.now().toString(),
      dishName: mealName.trim(),
      description: description.trim(),
      course: selectedCourse,
      price: parsedPrice,
    };

    // Update global menu items
    globalMenuItems = [...globalMenuItems, newItem];
    onMenuUpdate([...globalMenuItems]);

    // Reset form
    setMealName('');
    setDescription('');
    setPrice('');
    setSelectedCourse('');
    
    showAlert('Success', 'Menu item added successfully!');
  };

  const showAlert = (title: string, message: string): void => {
    Alert.alert(title, message);
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>Add New Menu Item</Text>
        <Text style={styles.subtitle}>Create delicious additions to your menu</Text>
      </View>

      <ScrollView style={styles.formScrollView}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Dish Name:</Text>
          <TextInput
            style={styles.input}
            value={mealName}
            onChangeText={setMealName}
            placeholder="Enter your preferred dish name"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter meal description"
            placeholderTextColor="#999"
            multiline
          />

          <Text style={styles.label}>Course:</Text>
          <View style={styles.courseContainer}>
            {GLOBAL_CONSTANTS.COURSES.map(course => (
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
      </ScrollView>
    </View>
  );
};

// Manage Menu Screen Component
const ManageMenuScreen = ({ 
  menuItems, 
  onMenuUpdate 
}: { 
  menuItems: MenuItem[]; 
  onMenuUpdate: (items: MenuItem[]) => void;
}): React.ReactElement => {
  const [filterCourse, setFilterCourse] = useState<string>('All');

  const deleteMenuItem = (id: string): void => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this menu item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedItems = menuItems.filter(item => item.id !== id);
            globalMenuItems = updatedItems;
            onMenuUpdate(updatedItems);
            showAlert('Success', 'Menu item deleted successfully!');
          },
        },
      ]
    );
  };

  const showAlert = (title: string, message: string): void => {
    Alert.alert(title, message);
  };

  const getFilteredMenuItems = (): MenuItem[] => {
    if (filterCourse === 'All') return menuItems;
    return menuItems.filter(item => item.course === filterCourse);
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>Manage Menu</Text>
        <Text style={styles.subtitle}>Edit or remove menu items</Text>
      </View>

      {/* Filter Section */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Filter by Course:</Text>
        <View style={styles.filterButtons}>
          {['All', ...GLOBAL_CONSTANTS.COURSES].map(course => (
            <Pressable
              key={course}
              style={[
                styles.filterButton,
                filterCourse === course && styles.filterButtonActive,
              ]}
              onPress={() => setFilterCourse(course)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  filterCourse === course && styles.filterButtonTextActive,
                ]}
              >
                {course}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <ScrollView style={styles.manageScrollView}>
        {getFilteredMenuItems().length === 0 ? (
          <Text style={styles.emptyText}>No menu items to manage.</Text>
        ) : (
          getFilteredMenuItems().map(item => (
            <View key={item.id} style={styles.manageItemCard}>
              <View style={styles.manageItemHeader}>
                <View style={styles.itemInfo}>
                  <Text style={styles.dishName}>{item.dishName}</Text>
                  <Text style={styles.courseBadge}>{item.course}</Text>
                </View>
                <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
              </View>
              <Text style={styles.description}>{item.description}</Text>
              <Pressable
                style={styles.deleteButton}
                onPress={() => deleteMenuItem(item.id)}
              >
                <Text style={styles.deleteButtonText}>Delete Item</Text>
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  content: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
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
    textAlign: 'center',
  },
  goldText: {
    color: '#FFD700',
  },
  subtitle: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
  },
  // Statistics Styles
  statsContainer: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 16,
    textAlign: 'center',
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  averagePrices: {
    flex: 1,
  },
  averagePriceItem: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 4,
  },
  // Filter Styles
  filterContainer: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#444',
  },
  filterButtonActive: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  filterButtonTextActive: {
    color: '#000',
    fontWeight: 'bold',
  },
  // Menu Display Styles
  menuDisplay: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 16,
    textAlign: 'center',
  },
  menuScrollView: {
    flex: 1,
  },
  manageScrollView: {
    flex: 1,
  },
  menuItemCard: {
    backgroundColor: '#2A2A2A',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  manageItemCard: {
    backgroundColor: '#2A2A2A',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#8B0000',
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  manageItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  itemInfo: {
    flex: 1,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  courseBadge: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: '600',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  description: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
    marginBottom: 12,
  },
  // Form Styles
  formScrollView: {
    flex: 1,
  },
  formContainer: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#2A2A2A',
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
    gap: 8,
  },
  courseButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#444',
    alignItems: 'center',
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
    marginTop: 8,
  },
  addButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#8B0000',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-end',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
  // Navigation Styles
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderTopWidth: 1,
    borderTopColor: '#444',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  navButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  navButtonActive: {
    backgroundColor: '#FFD700',
  },
  navButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  navButtonTextActive: {
    color: '#000',
    fontWeight: 'bold',
  },
});