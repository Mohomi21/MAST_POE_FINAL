# MAST Final Poe  — A Taste With Chef Christofel

A lightweight React Native app for adding and viewing chef menu items. Users can add dishes with name, description, course and price, view the current menu, and delete items.

## Features
- Add new menu items with validation (name, description, course, valid price)
- Toggle between Add Form and Menu view
- Delete menu items
- Simple, responsive UI with themed styling

## Quick start

Prerequisites
- Node.js (LTS)
- React Native CLI or Expo (depending on your setup)
- Android Studio / Xcode for device emulators (if testing on simulators)

Install dependencies
```bash
npm install
```

Start Metro and run
```bash
# start Metro bundler (clear cache if needed)
npx react-native start --reset-cache

# run on Android
npx react-native run-android

# run on iOS (macOS only)
npx react-native run-ios
```

## Usage
- Open the app, fill the form fields (Dish Name, Description, Course, Price) and tap "Add to Menu".
- Tap "View Chef’s Menu" to see added items.
- Use the "Delete" button on a menu item to remove it.

## Notes
- Ensure the background asset exists at `./assets/snap.jpg` or replace the ImageBackground to avoid Metro errors.
- If pushing to GitHub over HTTPS, use a Personal Access Token (PAT) when prompted for a password.

## Contributing
- Make changes on a feature branch, test locally, and submit a pull request.
- Keep commits small and descriptive.

## License
Add a license of your choice (e.g., MIT).  
