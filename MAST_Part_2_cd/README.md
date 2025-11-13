# MAST Part 2 - Chef Christoffel's Menu App

## Overview
This project is a React Native application that allows users to manage a menu for a restaurant. Users can add new menu items, view the current menu, and delete items as needed. The app is designed to be user-friendly and visually appealing, featuring a dark theme with gold accents.

## Features
- Add new menu items with details such as dish name, description, course, and price.
- View the list of menu items in a structured format.
- Delete menu items from the list.
- Responsive design suitable for mobile devices.

## Project Structure
```
MAST_Part_2_cd
├── src
│   ├── App.tsx                  # Main entry point of the application
│   ├── components
│   │   └── MenuItemCard.tsx     # Component for displaying individual menu items
│   ├── screens
│   │   ├── AddItemScreen.tsx    # Screen for adding new menu items
│   │   └── MenuScreen.tsx       # Screen for displaying the menu
│   ├── navigation
│   │   └── index.tsx            # Navigation setup for the application
│   ├── types
│   │   └── index.ts              # TypeScript types and interfaces
│   └── styles
│       └── global.ts            # Global styles and theme settings
├── package.json                  # npm configuration file
├── tsconfig.json                 # TypeScript configuration file
├── babel.config.js               # Babel configuration file
├── .gitignore                    # Files and directories to ignore by Git
└── README.md                     # Documentation for the project
```

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/MAST_Part_2_cd.git
   ```
2. Navigate to the project directory:
   ```
   cd MAST_Part_2_cd
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
- Run the application:
  ```
  npm start
  ```
- Follow the on-screen instructions to add, view, and delete menu items.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.