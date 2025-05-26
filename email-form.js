const scriptURL = 'https://script.google.com/macros/s/AKfycbxaHnbYclIgNgrBg4KgG-vQ7x5ZdSlUz5pXXHTIrckHJ6c5VdDwA1hP0rbKCJX30lgD5g/exec';
const form = document.forms['email-form'];
const response = document.getElementById('response');

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(() => {
        response.textContent = "Successfully subscribed.";
        form.reset();
    })
    .catch(error => {
        response.textContent = "❌ Something went wrong.";
        console.error('Error!', error.message);
    });
});