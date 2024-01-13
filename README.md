# react-native-slack-catch-up

<p>

[![supports iOS](https://img.shields.io/badge/iOS-999999.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff)](https://github.com/expo/expo)
[![supports Android](https://img.shields.io/badge/Android-A4C639.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff)](https://github.com/expo/expo)
[![supports web](https://img.shields.io/badge/Web-4285F4.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff)](https://github.com/expo/expo)
</p>

Slack's upcoming "Catch Up" tinder-like mobile app feature shared [here](https://x.com/metasidd/status/1745244070757216547?s=20), built in `react-native` & `typescript` with smooth ✨ **60fps** ✨ native reanimated & gesture-handler animations.

## 📱 Demo

![iOS Demo](./assets/full-demo.mp4)

## Features

- [x] 👆 Swipe right to mark as read, or left to keep unread.
- [x] ✔ Show different overlays on basis of swipe direction with animated opactiy depending on translation.
- [x] 🫰 Snap back card if swipe velocity is less than the configurable threshold.
- [x] ↔ Action buttons for swipe left & swipe right functionalities for accessibility & quick action.
- [x] ↩️ Undo anytime, we all make mistakes.
- [x] 🔢 Show number of threads left to catch up.
- [x] 👀 Show a peek of next card, if existing.
- [x] 🙌 The OG emoji & title of Slack at stack end.
- [x] 🔁 Reset whole stack to start again.
- [x] ✨ 60fps native animtions running on UI thread.
- [x] 💪 TypeScript support.
- [x] ⚛️ Reusbale React functional components with configurable props.
- [x] ♻ Supports Android, iOS & Web platforms.

## ✨ Micro Interactions & Animations

### 1. ⬆ Stack Enter Animation

The card stack smoothly slides in down on render. The action buttons below & header animates in same manner to compilment the motion.

![Stack Entry Animation](./assets/stack-entrance.gif)

### 2. 👆 Top Card Touch Up & Touch Down Interaction

The top most card smoothly scales up & down on touch to make the user feel it's interactive.

![Top Card Touch Up & Touch Down Interaction](./assets/top-card-touch.gif)

### 3. 👀 Next Card Peek

![Next Card Peek](./assets/next-card-peek.gif)

### 4. 🫰 Snap Back To Center On Low Swipe Velocity

![Snap Back To Center On Low Swipe Velocity](./assets/snap-back.gif)

### 5. 👉👈 Animated Swipe Overlays

![Animated Swipe Overlays](./assets/overlay.gif)

### 6. 🧃 Juicy Buttons

![Juicy Buttons](./assets/juicy-buttons.gif)

### 7. 🔍 Zoom-In Entrance Of Stack End

![Zoom-In Entrance Of Stack End](./assets/stack-end.gif)

## 🛠️ Built With

> [!NOTE]  
> The initial template was created with `npx create-react-native-app my-app -t with-reanimated`

1. `react-native` - v72
2. `react-native-reanimated` - v3
3. `react-native-gesture-handler` - v2
4. `expo` - v49

## 👨🏻‍💻 Developement

- Run `yarn` or `npm install`
- Run `yarn start` or `npm run start` to try it out.

## 📝 References

- [`react-native-reanimated` docs](https://docs.swmansion.com/react-native-reanimated/)
- [`react-native-gesture-handler` docs](https://docs.swmansion.com/react-native-gesture-handler/)
- [`react-native` docs](https://reactnative.dev/)
- [Slack Brand Color Pallete](https://brand.slackhq.com/color)
- [Expo Vector Icons Directory](https://icons.expo.fyi/Index)
