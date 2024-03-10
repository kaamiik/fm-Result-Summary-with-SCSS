// Get the parent element
const list = document.querySelector(".summary__list");

// Clear the list
list.innerHTML = "";

// Fetch the data from the JSON file
async function fetchData() {
  try {
    const response = await fetch("/data.json");
    const data = await response.json();

    // Calculate the average score
    let totalScore = 0;

    // Loop through the data
    data.forEach(function (item) {
      totalScore += item.score;

      // Create a new list item
      const listItemHTML = `
        <li class="list__item list__item--${item.category.toLowerCase()}">
          <div class="item__logo-name">
            <img src="${item.icon}" alt="">
            <p class="logo-name__${item.category.toLowerCase()}">${
        item.category
      }</p>
          </div>
          <div class="item__percentage">
            <p class="percentage__my-score">${item.score}</p>
            <p class="percentage__total">/ 100</p>
          </div>
        </li>
      `;

      // Append the list item to the list
      list.insertAdjacentHTML("beforeend", listItemHTML);
    });

    const averageScore = Math.round(totalScore / data.length);

    // Determine the rating and percentage based on the average score
    let rating, percentage;
    if (averageScore <= 26) {
      rating = "Poor";
      percentage = "10%";
    } else if (averageScore <= 52) {
      rating = "Average";
      percentage = "35%";
    } else if (averageScore <= 78) {
      rating = "Great";
      percentage = "65%";
    } else {
      rating = "Excellent";
      percentage = "90%";
    }

    // Display the average score
    document.querySelector(".percentage__myresult").textContent = averageScore;

    // Update the rating and percentage
    document.querySelector(".result__reaction").textContent = rating;
    document.querySelector(
      ".result__description"
    ).textContent = `You scored higher than ${percentage} of the people who have taken these tests.`;
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchData();
