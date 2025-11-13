# A Taste With Chef Christoffel (Expo React Native)

Short description
- Mobile app (Expo + React Native + TypeScript) for managing a restaurant menu. Provides a home view with statistics, a form to add menu items, and a management screen to edit/delete items. Uses an in-memory global menu store.

Key features
- Home screen: displays total items and average price per course, filter by course, and lists menu items.
- Add Item: validated form to create new menu items (dish name, description, course, price).
- Manage Menu: list, filter, and delete items.
- In-memory global store shared across screens.
- Styled UI with background image (`assets/snap.jpg`).

Project structure (important files)
- App.tsx — main entry (screens, navigation via bottom bar).
- assets/snap.jpg — background image used by the app (required).
- (Optional) split store/screens/styles if you refactor into multiple files.

Run locally (Windows PowerShell)
1. Open VS Code integrated terminal.
2. Change to app folder:
   cd "c:\Users\lab_services_student\Music\ST10439290__POE_Final\ST10439290_Dimakatso_Mohomi_Code\part-two"
3. Install dependencies:
   npm install
4. TypeScript check (optional):
   npx tsc --noEmit
5. Start Expo (clear cache if needed):
   npx expo start -c
6. Run on target:
   npm run android      # Android emulator/device (Windows)
   npm run web          # web browser

Git / push reminders
- Stage and commit:
  git add .
  git commit -m "feat: update menu UI and add/manage screens"
- If remote has new commits, fetch & rebase before push:
  git fetch origin
  git pull --rebase origin main
  git push -u origin main
- If remote not set:
  git remote add origin https://github.com/Mohomi21/MAST_POE_FINAL.git
  git push -u origin main

Notes & troubleshooting
- Ensure ./assets/snap.jpg exists; missing asset will break Metro bundler.
- If you encounter push rejections, run `git pull --rebase origin main` and resolve conflicts, then push.
- The global store is in-memory; data resets when the app restarts. Persist with AsyncStorage or backend if needed.

If you want, I can also create a concise changelog section listing the exact code changes to App.tsx for
