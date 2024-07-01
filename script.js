async function fetchKeyUtama() {
    const response = await fetch('https://rubikmtk.github.io/key-utama.json');
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.keyUtama;
}

function updateKeyUtama() {
    const sha256 = sha256;
    let keys = {};
    for (let i = 1; i <= 10; i++) {
        keys[`key${i}`] = sha256(i.toString());
    }
    const keyUtama = keys[`key${Math.floor(Math.random() * 10) + 1}`];
    document.getElementById('key-utama').innerText = keyUtama;
}

function generateRandomValue() {
    return Math.floor(Math.random() * 10) + 1;
}

async function updateKeyHashAndPerolehan() {
    const randomValue = generateRandomValue();
    const sha256 = sha256;
    const keyHash = sha256(randomValue.toString());
    document.getElementById('key-hash').innerText = keyHash;

    try {
        const keyUtama = await fetchKeyUtama();
        if (keyUtama === keyHash) {
            const perolehan = randomValue * 1.50;
            document.getElementById('perolehan').innerText = perolehan.toFixed(2);
            const totalPerolehanElement = document.getElementById('total-perolehan');
            const totalPerolehan = parseFloat(totalPerolehanElement.innerText.replace(/[^\d.-]/g, '')) + perolehan;
            totalPerolehanElement.innerText = `Rp. ${totalPerolehan.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')},-`;
        }
    } catch (error) {
        console.error('Error fetching key utama:', error);
    }
}

setInterval(updateKeyHashAndPerolehan, 4000);

(async function() {
    updateKeyUtama();
    setInterval(updateKeyUtama, 60000 * 5); // Update every 5, 15, 25, 40, 55 minutes
})();
        
