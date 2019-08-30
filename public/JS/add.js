const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const m1 = document.querySelector("#m1")
const m2 = document.querySelector("#m2")


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value

    m1.textContent = "Loading..";

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                m2.textContent = data.error;
            } else {
                m1.textContent = data.location;
                m2.textContent = data.summary + ' It is currently is' + data.temp + ' degress out. There is a ' + data.RP + '% chance of rain.';
            }
        })
    })

})