const questions = [
    "How many minutes on average per day did you walk this month?",
    "How many minutes on average per day did you walk last month?",
    "How many minutes on average per day did you walk 2 months ago?",
    "How many minutes on average per day did you do yoga this month?",
    "How many minutes on average per day did you do yoga last month?",
    "How many minutes on average per day did you do yoga 2 months ago?",
    "How many minutes on average per day did you swim this month?",
    "How many minutes on average per day did you swim last month?",
    "How many minutes on average per day did you swim 2 months ago?",
    "On a scale of 1-10, how would you rate your overall health?",
    "On a scale of 1-10, how would you rate your stress levels?",
    "On a scale of 1-10, how would you rate your mood?",
];

const questionsContainer = document.getElementById("questions");

questions.forEach((question, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `
        <label for="question-${index}">${question}</label>
        <input type="number" id="question-${index}" name="question-${index}" required>
    `;
    questionsContainer.appendChild(questionDiv);
});

const form = document.getElementById("survey-form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const responses = {};
    questions.forEach((_, index) => {
        const input = document.getElementById(`question-${index}`);
        responses[`question-${index}`] = parseInt(input.value, 10);
    });

    displayChart(responses);
});

function displayChart(responses) {
    const ctx = document.getElementById("chart").getContext("2d");
    const labels = ["2 months ago", "Last month", "This month", "Next month (prediction)"];
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Walking (minutes per day)",
                data: [
                    responses["question-2"],
                    responses["question-1"],
                    responses["question-0"],
                    predictNextMonth([
                        responses["question-2"],
                        responses["question-1"],
                        responses["question-0"],
                    ]),
                ],
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
            {
                label: "Yoga (minutes per day)",
                data: [
                    responses["question-5"],
                    responses["question-4"],
                    responses["question-3"],
                    predictNextMonth([
                        responses["question-5"],
                        responses["question-4"],
                        responses["question-3"],
                    ]),
                ],
                borderColor: "rgb(255, 99, 132)",
                tension: 0.1,
            },
            {
                label: "Swimming (minutes per day)",
                data: [
                    responses["question-8"],
                    responses["question-7"],
                    responses["question-6"],
                    predictNextMonth([
                        responses["question-8"],
                        responses["question-7"],
                        responses["question-6"],
                    ]),
                ],
                borderColor: "rgb(54, 162, 235)",
                tension: 0.1,
            },
        ],
    };

    const config = {
        type: "line",
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: "Health and Exercise Trends",
                },
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: "Time",
                    },
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: "Minutes per day",
                    },
                },
            },
        },
    };

    new Chart(ctx, config);
}

function predictNextMonth(data) {
    const slope = (data[2] - data[0]) / 2;
    return data[2] + slope;
}