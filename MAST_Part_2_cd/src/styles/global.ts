import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  // Define your global styles here
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1A1A1A',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default globalStyles;