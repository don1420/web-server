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

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault()
        
        const data = Object.fromEntries(new FormData(e.target).entries());

        fetch(`http://localhost:3000/weather?address=${data.location}`).then(response => {
            response.json().then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    console.log(data.forecast)
                    console.log(data.location)
                }
            })
        })
    })
})