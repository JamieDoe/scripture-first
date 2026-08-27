# Scripture First

A free Christian focus app that helps users put Scripture before distraction.

Users select distracting apps such as Instagram, TikTok or YouTube. When they try to open one, Scripture First requires them to spend a configurable amount of time reading Scripture before the app is unlocked.

The app will be built with Expo/React Native, with native Swift integrations for Apple's Screen Time APIs.

## Phase 1 — Technical Prototype

- [ x ] Create and clean the Expo project
- [ x ] Configure the iOS project for Family Controls
- [ x ] Request Screen Time authorisation
- [ x ] Allow the user to select apps
- [ x ] Shield a selected app using `ManagedSettings`
- [ x ] Create a basic `ShieldConfiguration` extension
- [ ] Display a custom shield when the user opens a blocked app
- [ ] Create a `ShieldAction` extension
- [ x ] Communicate between the native Screen Time extensions and the main app
- [ ] Add a basic Scripture requirement screen
- [ ] Implement a simple timer
- [ ] Remove the shield after the requirement is completed
- [ ] Verify the complete flow on a physical iPhone
- [ ] Test behaviour when the app is closed
- [ ] Test behaviour after restarting the device

## Phase 2 — MVP

- [ ] Build onboarding
- [ ] Improve app selection
- [ ] Build the Scripture reader
- [ ] Add configurable reading durations
- [ ] Track reading progress
- [ ] Persist settings locally
- [ ] Build settings screen
- [ ] Improve the unlock experience
- [ ] Test personally for 2–4 weeks

## Tech Stack

- **Expo / React Native**
- **TypeScript**
- **Expo Router**
- **Swift** for native iOS functionality
- **FamilyControls**
- **ManagedSettings**
- **DeviceActivity**
- **Supabase** — potentially later, not required for MVP

## Initial Goal

> **Prove that the complete Scripture → unlock flow works reliably on a real iPhone before building anything beyond the prototype.**
