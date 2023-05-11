// List of exercises
const exercises = {
    cardio: [
        {
            name: "Marching in Place",
            instructions: "Stand straight and start marching on the spot. Keep your movements smooth and rhythmic. Continue this for 5-10 minutes, take a break, and then repeat.",
            image: "marching-in-place.jpg",
            time: 10
        },
        {
            name: "Step-ups",
            instructions: "Stand in front of a sturdy, low step (like a step on a staircase). Step up with one foot, then the other, then step down in the same order. Repeat for 5-10 minutes.",
            image: "step-ups.jpg",
            time: 10
        },
        {
            name: "Seated Leg Lifts",
            instructions: "Sit on a chair with your back straight. Extend one leg out straight and lift it up and down. Repeat for 10-15 lifts, then switch legs.",
            image: "seated-leg-lifts.jpg",
            time: 15
        },
        // Add other cardio exercises here...
    ],
    strength: [
        {
            name: "Prenatal Squats",
            instructions: "Stand with feet hip-width apart, toes facing straight ahead or slightly outward. Lower your body slowly as if sitting back into a chair, keeping your weight over your heels. Keep lowering until thighs are as parallel to the floor as possible. Push through heels to stand back up. Repeat for 10-15 reps.",
            image: "prenatal-squats.jpg",
            time: 15
        },
        {
            name: "Standing Leg Lifts",
            instructions: "Stand straight and hold onto a wall or chair for balance. Lift one leg out to the side, keeping it straight. Repeat for 10-15 lifts, then switch legs.",
            image: "standing-leg-lifts.jpg",
            time: 15
        },
        // Add other strength exercises here...
    ],
    stretching: [
        {
            name: "Neck Stretch",
            instructions: "Sit comfortably, keep your back straight. Slowly tilt your head towards your right shoulder. Hold for 10-15 seconds, then switch sides.",
            image: "neck-stretch.jpg",
            time: 5
        },
        {
            name: "Calf Stretch",
            instructions: "Stand at arm's length from a wall, place your right foot behind your left foot. Slowly bend your left leg forward, keeping your right knee straight and your right heel on the ground. Hold the stretch for about 15-30 seconds and release. Repeat three times on each side.",
            image: "calf-stretch.jpg",
            time: 10
        },
        // Add other stretching exercises here...
    ],
    yoga: [
        {
            name: "Cat-Cow Pose",
            instructions: "Get on all fours, with your wrists directly under your shoulders and your knees directly under your hips. Inhale as you drop your belly towards the mat, lift your chin and chest (Cow Pose). Exhale as you pull your belly to your spine and round your back toward the ceiling (Cat Pose). Repeat 5-10 times.",
            image: "cat-cow-pose.jpg",
            time: 10
        },
        
                //...
                {
                    name: "Child's Pose",
                    instructions: "Kneel on the floor with your toes together and knees hip-width apart. Lower your torso between your knees. Extend your arms along the floor in front of you. Relax in this position for 1-2 minutes.",
                    image: "childs-pose.jpg",
                    time: 2
                },
                // Add other yoga exercises here...
            ],
            pilates: [
                {
                    name: "Arm Circles",
                    instructions: "Sit on a mat, extend your legs and lean back slightly, supporting yourself with your arms behind you. Circle your arms in one direction, then the other. Do this for 1-2 minutes.",
                    image: "arm-circles.jpg",
                    time: 2
                },
                {
                    name: "Leg Lifts",
                    instructions: "Lie on your side with your legs extended. Lift your top leg up and down. Repeat for 10-15 lifts, then switch sides.",
                    image: "leg-lifts.jpg",
                    time: 15
                },
                // Add other pilates exercises here...
            ]
        }
        
        document.getElementById("workout-form").addEventListener("submit", function(event){
            event.preventDefault();
            const stage = document.getElementById("stage").value;
            const workoutDays = document.getElementById("workout-days").value;
            const workoutDuration = document.getElementById("workout-duration").value;
            const intensity = document.getElementById("intensity").value;
            const exercisePreferences = [...document.getElementById("exercise-preferences").options].filter(option => option.selected).map(option => option.value);
            const restrictions = document.getElementById("restrictions").value;
        
            const workoutPlan = generateWorkoutPlan(stage, workoutDays, workoutDuration, intensity, exercisePreferences, restrictions);
            displayWorkoutPlan(workoutPlan);
        });
        
        function generateWorkoutPlan(stage, workoutDays, workoutDuration, intensity, exercisePreferences, restrictions) {
            // Generate workout plan based on user inputs
            const workoutPlan = [];
            for (let i = 0; i < workoutDays; i++) {
                const dayPlan = [];
                for (const pref of exercisePreferences) {
                    const exercisesInCategory = exercises[pref];
                    // Randomly select two exercises from the preferred category
                    for(let j=0; j<2; j++) {
                        const exercise = exercisesInCategory[Math.floor(Math.random() * exercisesInCategory.length)];
                        dayPlan.push(exercise);
                    }
                }
                workoutPlan.push(dayPlan);
            }
            return workoutPlan;
        }
        
        
        function displayWorkoutPlan(workoutPlan) {
            // Display workout plan
            // This is a placeholder function, replace with your actual logic
            const workoutDisplay = document.querySelector(".workout-display");
            workoutDisplay.innerHTML = "";
            for (let i = 0; i < workoutPlan.length; i++) {
                const dayPlan = workoutPlan[i];
                const dayPlanElement = document.createElement("div");
                dayPlanElement.className = "day-plan";
                dayPlanElement.innerHTML = `<h2>Day ${i+1}</h2>`;
                for (const exercise of dayPlan) {
                    const exerciseElement = document.createElement("div");
                    exerciseElement.className = "exercise";
                    exerciseElement.innerHTML = `<h3>${exercise.name}</h3><p>${exercise.instructions}</p><img src="${exercise.image}" alt="${exercise.name}">`;
                    dayPlanElement.appendChild(exerciseElement);
                }
                workoutDisplay.appendChild(dayPlanElement);
            }
        }
        