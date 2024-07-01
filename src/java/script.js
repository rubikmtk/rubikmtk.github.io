document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const phone = document.getElementById('phone').value;
    const wallet = document.getElementById('wallet').value;

    console.log('Username:', username);
    console.log('Nomor Handphone:', phone);
    console.log('List e Wallet:', wallet);

    // Implement your form submission logic here
});

