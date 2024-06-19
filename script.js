document.getElementById('config-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const guardInterval = document.getElementById('guardInterval').value;
    const layers = [];
    for (let i = 1; i <= 3; i++) {
        layers.push({
            segments: parseInt(document.getElementById(`segments${i}`).value),
            modulation: document.getElementById(`modulation${i}`).value,
            codeRate: document.getElementById(`codeRate${i}`).value
        });
    }

    // Validar y ajustar la suma de segmentos para que sea 13
    let totalSegments = layers.reduce((total, layer) => total + layer.segments, 0);
    if (totalSegments !== 13) {
        // Si la suma no es 13, ajustamos los segmentos de la capa C para cumplir la restricción
        layers[2].segments = 13 - (layers[0].segments + layers[1].segments);
        document.getElementById('segmentsC').value = layers[2].segments;
        
        // Mostrar mensaje de advertencia
        showMessage('La suma total de segmentos debe ser 13. Se han ajustado automáticamente los valores.');
    } else {
        hideMessage();
    }

    const config = {
        guardInterval: guardInterval,
        layers: layers
    };

    localStorage.setItem('isdbtConfig', JSON.stringify(config));
    
    displayConfig(config);
    alert('Configuración guardada con éxito!');
});

document.addEventListener('DOMContentLoaded', function() {
    const savedConfig = localStorage.getItem('isdbtConfig');
    if (savedConfig) {
        const config = JSON.parse(savedConfig);
        document.getElementById('guardInterval').value = config.guardInterval;
        config.layers.forEach((layer, index) => {
            const i = index + 1;
            document.getElementById(`segments${i}`).value = layer.segments;
            document.getElementById(`modulation${i}`).value = layer.modulation;
            document.getElementById(`codeRate${i}`).value = layer.codeRate;
        });
        displayConfig(config);
    }
});

function displayConfig(config) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    config.layers.forEach((layer, index) => {
        const dataRate = calculateDataRate(layer.segments, layer.modulation,
