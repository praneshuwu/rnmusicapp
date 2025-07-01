# RN Music App

A sleek and performant music player application built with React Native. This app provides a seamless user experience for browsing albums and playing tracks, featuring a modern interface and robust state management.

---

## 🚀 Key Features

- **Album Discovery:** Browse an extensive list of music albums fetched from an external API.
- **Detailed Tracklists:** View all tracks for a selected album, including duration and release date.
- **Full-Featured Audio Player:** A persistent audio player with controls for play, pause, skip, and previous.
- **Background Audio:** Listen to music even when the app is in the background, thanks to a dedicated track player service.
- **Modern UI:** A clean and intuitive user interface styled with Tailwind CSS.
- **Centralized State:** Predictable state management powered by Redux Toolkit for albums, tracks, and player status.
- **Cross-Platform:** A single codebase that runs smoothly on both Android and iOS.

---

## 🛠️ Tech Stack

- **Core:** React Native
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **Navigation:** React Navigation
- **Audio Playback:** `react-native-track-player`
- **Linting & Formatting:** ESLint, Prettier

---

## ⚙️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js & npm
- React Native development environment set up for your OS.
  - [React Native Official Guide](https://reactnative.dev/docs/environment-setup)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/praneshuwu/rnmusicapp.git
    cd rnmusicapp
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root of the project and add the necessary environment variables. Based on `utils/apiCalls.js`, you likely need to configure your API endpoint.
    ```
    # .env
    API_BASE_URL=https://your-api-endpoint.com/
    ```

4.  **Link Assets:**
    ```sh
    npx react-native-asset
    ```

### Running the Application

- **To run on Android:**
  ```sh
  npx react-native run-android
  ```

- **To run on iOS:**
  ```sh
  cd ios && pod install && cd ..
  npx react-native run-ios
  ```

---

## 📂 Project Structure

The project is organized into the following directories:

```
/
├── android/          # Android native project
├── assets/           # Fonts, images, and other static assets
├── components/       # Reusable UI components (e.g., AlbumListItem, AudioPlayer)
├── ios/              # iOS native project
├── screens/          # Top-level screen components (e.g., Home, Album, Player)
├── store/            # Redux Toolkit slices and store configuration
├── utils/            # Helper functions, API calls, and services
└── App.js            # Main application component and navigation setup
```
---

## 👤 Contact

Your Name - [krishna.pranesh@live.com](mailto:krishna.pranesh@live.com)

Project Link: [https://github.com/praneshuwu/rnmusicapp.git](https://github.com/praneshuwu/rnmusicapp.git)
