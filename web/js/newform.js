let myChart;

document.getElementById("fitness-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const weeks = parseInt(document.getElementById("weeks").value);
    const cardio = parseInt(document.getElementById("cardio").value);
    const strength = parseInt(document.getElementById("strength").value);
    const pelvic = parseInt(document.getElementById("pelvic").value);

    const recommendedCardio = 4;
    const recommendedStrength = 2;
    const recommendedPelvic = 3;

    const chartData = {
        labels: ["Cardio", "Strength Training", "Pelvic Floor Exercises"],
        datasets: [
            {
                label: "Current",
                data: [cardio, strength, pelvic],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                borderWidth: 1
            },
            {
                label: "Recommended",
                data: [recommendedCardio, recommendedStrength, recommendedPelvic],
                backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
                borderWidth: 1
            }
        ]
    };

    const ctx = document.getElementById("fitness-chart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10
                }
            },
            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    });

    const suggestions = document.getElementById("suggestions");
    suggestions.innerHTML = "<h3>Suggestions:</h3>";

  
    if (cardio < recommendedCardio) {
        suggestions.innerHTML += "<p>Increase cardio exercise to at least 4 sessions per week.</p>";
    }
  
    if (strength < recommendedStrength) {
        suggestions.innerHTML += "<p>Increase strength training to at least 2 sessions per week.</p>";
    }
  
    if (pelvic < recommendedPelvic) {
        suggestions.innerHTML += "<p>Increase flexibility training to at least 3 sessions per week.</p>";
    }

    const printBtn = document.getElementById("print-btn");
    printBtn.addEventListener("click", () => {
    // check if the jsPDF library is loaded
    if (typeof jsPDF === "undefined") {
        console.error("jsPDF library not loaded");
        return;
    }

    const doc = new jsPDF();

    const canvas = document.getElementById("fitness-chart");
    const imgData = canvas.toDataURL("image/png");
    doc.addImage(imgData, "PNG", 10, 10, 100, 60);

    const suggestionsText = suggestions.innerText;
    doc.setFontSize(12);
    doc.text(10, 80, suggestionsText);

    doc.save("fitness_recommendations.pdf");
});


  });
  