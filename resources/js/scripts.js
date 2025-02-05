const daily_button = document.getElementById("daily-period-button");
const weekly_button = document.getElementById("weekly-period-button");
const monthly_button = document.getElementById("monthly-period-button");

const buttons = [daily_button, weekly_button, monthly_button]; // Store buttons in an array

// Fetch data from local file
fetch("./resources/data/data.json")
	.then((response) => response.json())
	.then((data) => {
		// Function to update grid items based on timeframe
		function updateGridItems(timeframe) {
			data.forEach((entry) => {
				const gridItem = document.querySelector(`.grid-item.${entry.title.toLowerCase()}-grid`);
				if (gridItem) {
					const currentOutput = gridItem.querySelector(".hour-text");
					const previousOutput = gridItem.querySelector(".previous-text");

					if (currentOutput && previousOutput) {
						currentOutput.textContent = `${entry.timeframes[timeframe].current}hrs`;
						previousOutput.textContent = `Last Week - ${entry.timeframes[timeframe].previous}hrs`;
					}
				}
			});
		}

		// Function to handle button click
		function handleButtonClick(selectedButton, timeframe) {
			buttons.forEach((button) => button.classList.remove("button-selected")); // Remove class from all buttons
			selectedButton.classList.add("button-selected"); // Add class to clicked button
			updateGridItems(timeframe); // Update grid data
		}

		// Set default data to daily on page load
		handleButtonClick(daily_button, "daily");

		// Event listeners for buttons
		daily_button.addEventListener("click", () => handleButtonClick(daily_button, "daily"));
		weekly_button.addEventListener("click", () => handleButtonClick(weekly_button, "weekly"));
		monthly_button.addEventListener("click", () => handleButtonClick(monthly_button, "monthly"));
	})
	.catch((error) => console.log("Error loading data:", error));
