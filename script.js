async function fetchKeyUtama() {
    const response = await fetch('https://raw.githubusercontent.com/username/my-site/main/key-utama.json');
    const data = await response.json();
    return data.keyUtama;
}

async function updateKeyUtama() {
    const sha256 = require('js-sha256').sha256;
    let keys = {};
    for (let i = 1; i <= 10; i++) {
        keys[`key${i}`] = sha256(i.toString());
    }
    const keyUtama = keys[`key${Math.floor(Math.random() * 10) + 1}`];
    document.getElementById('key-utama').innerText = keyUtama;

    // Update key utama JSON on GitHub
    const token = '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';
    const octokit = new Octokit({ auth: token });
    await octokit.repos.createOrUpdateFileContents({
        owner: 'username',
        repo: 'my-site',
        path: 'key-utama.json',
        message: 'Update key utama',
        content: Buffer.from(JSON.stringify({ keyUtama })).toString('base64'),
        branch: 'main',
    });
}

function generateRandomValue() {
    return Math.floor(Math.random() * 10) + 1;
}

function updateKeyHashAndPerolehan() {
    const randomValue = generateRandomValue();
    const sha256 = require('js-sha256').sha256;
    const keyHash = sha256(randomValue.toString());
    document.getElementById('key-hash').innerText = keyHash;

    fetchKeyUtama().then(keyUtama => {
        if (keyUtama === keyHash) {
            const perolehan = randomValue * 1.50;
            document.getElementById('perolehan').innerText = perolehan.toFixed(2);
            const totalPerolehanElement = document.getElementById('total-perolehan');
            const totalPerolehan = parseFloat(totalPerolehanElement.innerText.replace(/[^\d.-]/g, '')) + perolehan;
            totalPerolehanElement.innerText = `Rp. ${totalPerolehan.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')},-`;
        }
    });
}

setInterval(updateKeyHashAndPerolehan, 4000);

(async function() {
    await updateKeyUtama();
    setInterval(updateKeyUtama, 60000 * 5); // Update every 5, 15, 25, 40, 55 minutes
})();
          
