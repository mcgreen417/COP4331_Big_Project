// Home.js - Vertical
var myPlants = [
    {
        key:'1',
        nickname:'Silly Cilantro',
        species:'Cilantro',
        reminder: 'Water in 3 days',
        image: require('../assets/flower5.png')
    },
    {
        key:'2',
        nickname:'Bugs Bunny',
        species:'Carrot',
        reminder: 'Water in 6 days',
        image: require('../assets/flower6.png')
    },
    {
        key:'3',
        nickname:'Silly Cilantro',
        species:'Cilantro',
        reminder: 'Water in 3 days',
        image: require('../assets/flower5.png')
    },
    {
        key:'4',
        nickname:'Bugs Bunny',
        species:'Carrot',
        reminder: 'Water in 6 days',
        image: require('../assets/flower6.png')
    },
    {
        key:'5',
        nickname:'Silly Cilantro',
        species:'Cilantro',
        reminder: 'Water in 3 days',
        image: require('../assets/flower5.png')
    },
    {
        key:'6',
        nickname:'Bugs Bunny',
        species:'Carrot',
        reminder: 'Water in 6 days',
        image: require('../assets/flower6.png')
    }
]

// Home.js - Horizontal
var plantImages = [
    {key:'1', value: require('../assets/flower1.png')},
    {key:'2', value: require('../assets/flower2.png')},
    {key:'3', value: require('../assets/flower3.png')},
    {key:'4', value: require('../assets/flower1.png')},
    {key:'5', value: require('../assets/flower1.png')},
    {key:'6', value: require('../assets/flower3.png')},
    {key:'7', value: require('../assets/flower3.png')},
]

// Search.js - Vertical
var plantReminders = [
    {key:'1', nickname:"Silly Cilantro", species:"Cilantro", date: "December 5th, 2019", classification: "Herb", image: require('../assets/flower5.png')},
    {key:'2', nickname:"Apple Fruit", species:"Richard", date: "June 6th, 2019", classification: "Apple", image: require('../assets/apple.png')},
    {key:'3', nickname:"Banana Fruit", species:"Hiyorinne", date: "March 7th, 2018", classification: "Banana", image: require('../assets/banana.png')},
    {key:'4', nickname:"Orange Fruit", species:"Donald", date: "March 5th, 2019", classification: "Orange", image: require('../assets/orange.png')},
    {key:'5', nickname:"Apple Cider", species:"Donald", date: "March 5th, 2019", classification: "Orange", image: require('../assets/orange.png')},
]

plantReminders = plantReminders.sort((a,b) =>{
    if(a.nickname.toLowerCase() > b.nickname.toLowerCase())
        return 1;
    else if(a.nickname.toLowerCase() < b.nickname.toLowerCase())
        return -1;
    else
        return 0;
})

export {myPlants, plantImages, plantReminders};