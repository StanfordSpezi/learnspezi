# Quick Start Guide 🚀

Welcome to Spezi! This guide will help you create your first Spezi application.

!!! info "Prerequisites"
    Make sure you've completed the [Development Environment Setup](development-environment.md) before starting this guide.

## Overview

In this guide, you'll:
1. Download the Spezi Template Application
2. Open and run it in Xcode
3. Make your first customization
4. Understand the basic structure

## Step 1: Get the Template Application

The easiest way to start with Spezi is using the Template Application:

1. Visit the [Spezi Template Application](https://github.com/StanfordSpezi/SpeziTemplateApplication) on GitHub
2. Click the green **Code** button
3. Select **Download ZIP**
4. Unzip the downloaded file to your Desktop or preferred location

Alternatively, if you're comfortable with Git:
```bash
git clone https://github.com/StanfordSpezi/SpeziTemplateApplication.git
```

## Step 2: Open the Project

1. Navigate to the downloaded folder
2. Double-click the `TemplateApplication.xcodeproj` file
3. Xcode will open with your project loaded

## Step 3: Run Your First Spezi App

1. In Xcode, make sure the destination is set to an iPhone simulator (like "iPhone 16 Pro")
2. Click the **Play** button (▶️) in the top-left corner
3. Wait for the app to build and launch

🎉 **Congratulations!** You're now running your first Spezi application.

## Step 4: Explore the App

In the simulator, you'll see:
- A welcome screen with onboarding flow
- Health data collection features
- User account functionality (if using Firebase)
- Example screens and navigation

Take a few minutes to click around and see what's included.

## Step 5: Make Your First Change

Let's customize the app title:

1. In Xcode's file navigator (left sidebar), find and open `ContentView.swift`
2. Look for text that says "Spezi Template Application"
3. Change it to "My Health App" or whatever you prefer
4. Run the app again to see your change

## Understanding the Project Structure

Your Spezi app has several key components:

- **Views**: The screens users see (written in SwiftUI)
- **Modules**: Spezi components that add functionality
- **Configuration**: Settings for how modules work together
- **Resources**: Images, colors, and other assets

## Next Steps

Now that you have a working Spezi app:

- **Customize the interface**: Modify colors, text, and layout
- **Add modules**: Explore available Spezi modules for new features
- **Connect to cloud services**: Set up Firebase for data storage
- **Follow tutorials**: Learn specific development techniques

## Getting Help

- Check the [Core Concepts](../core-concepts/overview.md) for deeper understanding
- Browse [Modules](../modules/overview.md) to see what's available
- Visit the [Spezi GitHub](https://github.com/StanfordSpezi) for examples and documentation