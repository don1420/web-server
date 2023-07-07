fetch('http://localhost:3000/weather?address=zaporizhia').then(response => {
    response.json().then(data => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data.forecast)
            console.log(data.location)
        }
    })
})
console.log('Client side JS is loaded')

document.addEventListener('DOMContentLoaded', function (event) {
    const weatherForm = document.querySelector('form')
    const forecastContainer = document.querySelector('#forecast-container')
    const locationContainer = document.querySelector('#location-container')

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const data = Object.fromEntries(new FormData(e.target).entries());

        forecastContainer.textContent = 'Loading...'

        fetch(`/weather?address=${data.location}`).then(response => {
            response.json().then(data => {
                if (data.error) {
                    forecastContainer.textContent = data.error
                } else {
                    forecastContainer.textContent = data.forecast
                    locationContainer.textContent = data.location
                }
            })
        })
    })
})