const daily_button = document.getElementById("daily-period-button");
const weekly_button = document.getElementById("weekly-period-button");
const monthly_button = document.getElementById("monthly-period-button");

// Fetch data from local file
fetch("./resources/data/data.json")
	.then((response) => response.json())
	.then((data) => {
		// Function to update grid items based on timeframe
		function updateGridItems(timeframe) {
			data.forEach((entry) => {
				// Find the matching grid item based on title
				const gridItem = document.querySelector(`.grid-item.${entry.title.toLowerCase()}-grid`);
				if (gridItem) {
					// Check if elements exist, then update text content dynamically
					const currentOutput = gridItem.querySelector(".hour-text");
					const previousOutput = gridItem.querySelector(".previous-text");

					if (currentOutput && previousOutput) {
						currentOutput.textContent = `${entry.timeframes[timeframe].current}hrs`;
						previousOutput.textContent = `Last Week - ${entry.timeframes[timeframe].previous}hrs`;
					}
				}
			});
		}

		// Set default data to daily on page load
		updateGridItems("daily");

		// Event listeners for buttons
		daily_button.addEventListener("click", () => updateGridItems("daily"));
		weekly_button.addEventListener("click", () => updateGridItems("weekly"));
		monthly_button.addEventListener("click", () => updateGridItems("monthly"));
	})
	.catch((error) => console.log("Error loading data:", error));
