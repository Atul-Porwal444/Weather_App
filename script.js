// http://api.weatherapi.com/v1/current.json?key=2fbf87addc3d43b8a71101642241512&q=mumbai&aqi=no

const tempratureField = document.querySelector('.temp')
const locationField = document.querySelector('.time_location p')
const dateandTimeField = document.querySelector('.time_location span')
const conditionField = document.querySelector('.condition_p')
const searchField = document.querySelector('.search_area')
const form = document.querySelector('form')


form.addEventListener('submit',searchForLocation)


let target = 'lucknow'


const fetchResults = async (targetLocation) => {
    
    let url = `http://api.weatherapi.com/v1/current.json?key=2fbf87addc3d43b8a71101642241512&q=${targetLocation}&aqi=no`

    const response = await fetch(url)

    const data = await response.json()


    let locationName = data.location.name
    let time = data.location.localtime
    let temp = data.current.temp_c
    let condition = data.current.condition.text

    updateDetail(locationName , time , temp , condition)

}

function updateDetail(locationName , time , temp , condition){

    let splitDate = time.split(' ')[0]

    let splitTime = time.split(' ')[1]

    let currentDay = getDayName(new Date(splitDate).getDay())



    tempratureField.innerHTML = temp
    locationField.innerHTML = locationName
    dateandTimeField.innerHTML = `${splitDate} ${currentDay} ${splitTime}`
    conditionField.innerHTML = condition

}


function searchForLocation(e){
    e.preventDefault();

    target = searchField.value
    searchField.value = ""

    fetchResults(target)


}

function getDayName(number){
    switch(number){
        case 0: return "Sunday"
        case 1: return "Monday"
        case 2: return "Tuesday"
        case 3: return "Wednesday"
        case 4: return "Thrusday"
        case 5: return "Friday"
        case 6: return "Saturday"
    }
}


fetchResults(target)