document.addEventListener('DOMContentLoaded', () => {
    const cropForm = document.getElementById('cropForm');
    const suggestionsDiv = document.getElementById('suggestions');
    const responseList = document.getElementById('response');

    cropForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting

        // Get form values
        const soilType = document.getElementById('soilType').value;
        const pH = parseFloat(document.getElementById('pH').value);
        const irrigation = document.getElementById('irrigation').value;
        const budget = parseInt(document.getElementById('budget').value, 10);

        // Process inputs to suggest crops
        const suggestedCrops = getCropSuggestions(soilType, pH, irrigation, budget);

        // Display suggestions
        displaySuggestions(suggestedCrops);
    });

    function getCropSuggestions(soil, ph, irrigationMethod, budget) {
        // Extended crop data with 20 crops
        const crops = [
            { name: 'Wheat', suitableSoil: ['Red Soil', 'Black Soil', 'Loamy Soil'], phRange: [6.0, 7.0], irrigation: ['Drip Irrigation', 'Sprinkler Irrigation'], cost: 15000 },
            { name: 'Rice', suitableSoil: ['Clay Soil', 'Black Soil'], phRange: [5.0, 6.5], irrigation: ['Flood Irrigation', 'Drip Irrigation'], cost: 20000 },
            { name: 'Cotton', suitableSoil: ['Red Soil', 'Black Soil'], phRange: [6.0, 8.0], irrigation: ['Drip Irrigation', 'Sprinkler Irrigation'], cost: 18000 },
            { name: 'Sugarcane', suitableSoil: ['Loamy Soil', 'Black Soil'], phRange: [6.0, 8.5], irrigation: ['Flood Irrigation', 'Center Pivot Irrigation'], cost: 25000 },
            { name: 'Maize', suitableSoil: ['Sandy Soil', 'Loamy Soil'], phRange: [5.5, 7.0], irrigation: ['Drip Irrigation', 'Sprinkler Irrigation'], cost: 12000 },
            { name: 'Barley', suitableSoil: ['Loamy Soil', 'Sandy Soil'], phRange: [6.0, 7.5], irrigation: ['Drip Irrigation', 'Sprinkler Irrigation'], cost: 10000 },
            { name: 'Oats', suitableSoil: ['Clay Soil', 'Loamy Soil'], phRange: [5.5, 7.0], irrigation: ['Drip Irrigation', 'Sprinkler Irrigation'], cost: 9000 },
            { name: 'Millet', suitableSoil: ['Sandy Soil', 'Loamy Soil'], phRange: [5.5, 6.5], irrigation: ['Sprinkler Irrigation', 'Flood Irrigation'], cost: 8500 },
            { name: 'Sorghum', suitableSoil: ['Red Soil', 'Loamy Soil'], phRange: [5.8, 7.5], irrigation: ['Drip Irrigation', 'Flood Irrigation'], cost: 8000 },
            { name: 'Peanuts', suitableSoil: ['Sandy Soil', 'Loamy Soil'], phRange: [6.0, 7.0], irrigation: ['Drip Irrigation', 'Sprinkler Irrigation'], cost: 12000 },
            { name: 'Sunflower', suitableSoil: ['Loamy Soil', 'Clay Soil'], phRange: [6.0, 7.5], irrigation: ['Drip Irrigation', 'Sprinkler Irrigation'], cost: 13000 },
            { name: 'Potato', suitableSoil: ['Loamy Soil', 'Sandy Soil'], phRange: [5.0, 6.5], irrigation: ['Drip Irrigation', 'Sprinkler Irrigation'], cost: 20000 },
            { name: 'Tomato', suitableSoil: ['Loamy Soil', 'Sandy Soil'], phRange: [5.5, 7.5], irrigation: ['Drip Irrigation', 'Sprinkler Irrigation'], cost: 18000 },
            { name: 'Onion', suitableSoil: ['Loamy Soil', 'Sandy Soil'], phRange: [5.5, 7.5], irrigation: ['Drip Irrigation', 'Sprinkler Irrigation'], cost: 15000 },
            { name: 'Carrot', suitableSoil: ['Loamy Soil', 'Sandy Soil'], phRange: [5.5, 7.5], irrigation: ['Drip Irrigation'], cost: 14000 },
            { name: 'Cabbage', suitableSoil: ['Loamy Soil'], phRange: [6.0, 7.5], irrigation: ['Drip Irrigation', 'Sprinkler Irrigation'], cost: 17000 },
            { name: 'Broccoli', suitableSoil: ['Loamy Soil', 'Sandy Soil'], phRange: [6.0, 7.0], irrigation: ['Drip Irrigation'], cost: 15000 },
            { name: 'Cauliflower', suitableSoil: ['Loamy Soil', 'Sandy Soil'], phRange: [6.0, 7.5], irrigation: ['Drip Irrigation', 'Sprinkler Irrigation'], cost: 16000 },
            { name: 'Spinach', suitableSoil: ['Loamy Soil'], phRange: [6.0, 7.5], irrigation: ['Drip Irrigation'], cost: 12000 },
            { name: 'Lettuce', suitableSoil: ['Loamy Soil', 'Sandy Soil'], phRange: [6.0, 7.5], irrigation: ['Drip Irrigation'], cost: 10000 }
        ];

        // Filter crops based on user input
        return crops.filter(crop => 
            crop.suitableSoil.includes(soil) &&
            ph >= crop.phRange[0] && ph <= crop.phRange[1] &&
            crop.irrigation.includes(irrigationMethod) &&
            crop.cost <= budget
        ).map(crop => crop.name);
    }

    function displaySuggestions(crops) {
        // Clear previous suggestions
        responseList.innerHTML = '';

        if (crops.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No suitable crops found based on the provided criteria.';
            responseList.appendChild(li);
        } else {
            crops.forEach(crop => {
                const li = document.createElement('li');
                li.textContent = crop;
                responseList.appendChild(li);
            });
        }

        // Show the suggestions div
        suggestionsDiv.classList.remove('hidden');
    }
});
