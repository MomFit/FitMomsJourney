document.getElementById('workout-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission and page refresh

    // Get user input values
    const stage = document.getElementById('stage').value;
    const workoutDays = parseInt(document.getElementById('workout-days').value);
    const workoutDuration = parseInt(document.getElementById('workout-duration').value);
    const intensity = document.getElementById('intensity').value;
    const exercisePreferences = Array.from(document.getElementById('exercise-preferences').selectedOptions).map(option => option.value);
    const restrictions = document.getElementById('restrictions').value;

    // Generate workout plan based on user input
    const workoutPlan = generateWorkoutPlan(stage, workoutDays, workoutDuration, intensity, exercisePreferences, restrictions);

    // Display workout plan
    displayWorkoutPlan(workoutPlan);
});

function generateWorkoutPlan(stage, workoutDays, workoutDuration, intensity, exercisePreferences, restrictions) {
    // This is a simple example of a workout plan generator
    // You can replace this with a more advanced logic tailored to pregnant and postpartum women

    const exercises = exercisePreferences.map(pref => {
        return {
            name: pref,
            duration: Math.floor(workoutDuration / exercisePreferences.length)
        };
    });

    const workoutPlan = [];
    for (let i = 0; i < workoutDays; i++) {
        workoutPlan.push({
            day: i + 1,
            exercises: exercises
        });
    }

    return workoutPlan;
}

function displayWorkoutPlan(workoutPlan) {
    const workoutDisplay = document.querySelector('.workout-display');
    workoutDisplay.innerHTML = ''; // Clear previous workout plan

    workoutPlan.forEach(dayPlan => {
        const dayContainer = document.createElement('div');
        dayContainer.className = 'day-container';
        dayContainer.innerHTML = `<h3>Day ${dayPlan.day}</h3>`;
        
        const exerciseList = document.createElement('ul');
        dayPlan.exercises.forEach(exercise => {
            const exerciseItem = document.createElement('li');
            exerciseItem.textContent = `${exercise.name} - ${exercise.duration} minutes`;
            exerciseList.appendChild(exerciseItem);
        });

        dayContainer.appendChild(exerciseList);
        workoutDisplay.appendChild(dayContainer);
    });
}
