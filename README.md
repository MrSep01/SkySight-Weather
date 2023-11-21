# SkySight Weather

## Introduction 📚

The SkySight Weather is a dynamic and user-friendly web application designed to provide travelers with real-time weather outlooks for multiple cities. This tool assists users in planning their trips by displaying current and forecasted weather conditions.

## Project Overview 🌐

The primary goal of this project is to offer a seamless and interactive interface for users to retrieve weather data. By inputting city names, users can view the current weather conditions and a 5-day forecast, aiding in travel and event planning.

### Objectives 🎯

- Interactive web interface for easy navigation and weather data retrieval.
- Real-time display of weather conditions including temperature, humidity, and wind speed.
- Future weather forecast with a clean presentation of anticipated conditions.
- Local storage utilization for quick access to previously searched cities.

## Technical Overview 🧩

The application leverages the OpenWeatherMap's 5 Day Weather Forecast API to fetch weather data based on geographic coordinates. It provides a clean and modern user interface, optimized for both desktop and mobile devices, mimicking the design of iOS and iPad apps.

## Development Process 💻

### Step 1: API Integration

Integration with OpenWeatherMap's API to fetch and display weather data for a given set of coordinates.

### Step 2: Interface Development

Development of a responsive and modern user interface using HTML, CSS, and JavaScript to display weather data dynamically.

### Step 3: Local Storage

Implementing `localStorage` to store and retrieve the search history of the user.

### Step 4: Search History Reset 

Implementing "History Reset" to Erase the search history of the user. 

## Code Breakdown 🧠

### Main Components:

- **User Interface:** HTML structure with modern input and button elements for search functionality.
- **Styling:** CSS with responsive design principles and media queries for mobile optimization.
- **Weather Data Handling:** JavaScript functions to call APIs, process data, and update the UI.

## How to Use the Project 🖥️

1. Obtain an API key from [OpenWeatherMap](https://openweathermap.org/).
2. Clone the repository or download the source code.
3. Replace `'YOUR_API_KEY'` in the `script.js` file with your actual OpenWeatherMap API key.
4. Open the `index.html` file in your preferred web browser.
5. Enter the name of a city and click on the 'Search' button to view the weather data.
6. Click on any city name in the search history to quickly access the weather data again.

## Repository

[GitHub Repository Link](https://github.com/yourusername/weather-dashboard)

## Demo

Here's a live demo of the application:
[Live Demo]()

## Conclusion 🏁

The Weather Dashboard serves as an efficient and straightforward solution for accessing weather forecasts across the globe. Its responsive design and ease of use make it an ideal companion for travelers.

## License & Contribution 📜

Contributions to the project are welcome! This project is released under the MIT License.

## Contact 📞

Should you have any feedback or questions, please reach out to sep.alamouti@sepalamouti.com