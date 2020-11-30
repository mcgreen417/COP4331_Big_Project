<<<<<<< Updated upstream
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
=======

// Mock JSON array
var plantReminders = [
    {
        key:'supersayin',
        nickname:"Silly Cilantro", 
        species:"Cilantro", 
        date: "2020-12-5", 
        classification: ["Algae", "Flower", "Fruit"],
        image: require('../assets/flower5.png'),
        waterNeeded:[true, false, true],
        sunNeeded:[true, true, false],
        reminders:{
            fertilized:10,
            rotated:15,
            prunned:15,
            trimmed:15,
            replanted:12,
            watered:5,
        },

        notes:"This is my favorite Cilantro",
        completedTask:[false, false],
        deleteEntry:false

    },
    {
        key:'girls', 
        nickname:"Apple Fruit", 
        species:"Richard", 
        date: "2019-6-6", 
        classification: ["Grass", "Herb", "Moss"], 
        image: require('../assets/apple.png'),
        waterNeeded:[true, false, true],
        sunNeeded:[true, true, false],
        reminders:{
            fertilized:10,
            rotated:15,
            prunned:15,
            trimmed:15,
            replanted:12,
            watered:5,
        },
        notes:"This is my favorite Apple",
        completedTask:[false, false],
        deleteEntry:false
    },
    {
        key:'2', 
        nickname:"Banana Fruit", 
        species:"Hiyorinne", 
        date: "2018-3-6", 
        classification: ["Orchid", "Root", "Shrub"],
        image: require('../assets/banana.png'),
        waterNeeded:[true, false, true],
        sunNeeded:[true, true, true],
        reminders:{
            fertilized:10,
            rotated:15,
            prunned:15,
            trimmed:15,
            replanted:12,
            watered:5,
        },
        notes:"This is my favorite Banana",
        completedTask:[false, false],
        deleteEntry:false
    },
    {
        key:'3', 
        nickname:"Orange Fruit", 
        species:"Donald", 
        date: "2019-5-12", 
        classification: ["Succulent", "Tree", "Veggie"],
        image: require('../assets/orange.png'),
        waterNeeded:[true, false, true],
        sunNeeded:[true, true, false],
        reminders:{
            fertilized:10,
            rotated:15,
            prunned:15,
            trimmed:15,
            replanted:12,
            watered:5,
        },
        notes:"This is my favorite Orange",
        completedTask:[false, false],
        deleteEntry:false
    },
    {
        key:'guru', 
        nickname:"Apple Cider", 
        species:"Donald", 
        date: "2019-10-7", 
        classification: ["Vine", "Other"],
        image: require('../assets/cider.png'),
        waterNeeded:[true, false, true],
        sunNeeded:[true, true, true],
        reminders:{
            fertilized:10,
            rotated:15,
            prunned:15,
            trimmed:15,
            replanted:12,
            watered:5,
        },
        notes:"This is my favorite Cider",
        completedTask:[false, false],
        deleteEntry:false
    },

]

var plantReminders2 = [
    {
        key:'supersayin',
        nickname:"Silly Cilantro", 
        species:"Cilantro", 
        date: "2020-12-5", 
        classification: ["Algae", "Flower", "Fruit"],
        image: require('../assets/flower5.png'),
        sunlight:3,
        water:2,
        reminders:{
            fertilized:10,
            rotated:15,
            prunned:15,
            trimmed:15,
            replanted:12,
            watered:5,
        },
        completedTask:[false, false],
        deleteEntry:false,

        notes:"This is my favorite Cilantro",

    },
    {
        key:'girls', 
        nickname:"Apple Fruit", 
        species:"Richard", 
        date: "2019-6-6", 
        classification: ["Grass", "Herb", "Moss"], 
        image: require('../assets/apple.png'),
        sunlight:3,
        water:2,
        reminders:{
            fertilized:10,
            rotated:15,
            prunned:15,
            trimmed:15,
            replanted:12,
            watered:5,
        },
        completedTask:[false, false],
        deleteEntry:false,
        notes:"This is my favorite Apple",
    },
    {
        key:'2', 
        nickname:"Banana Fruit", 
        species:"Hiyorinne", 
        date: "2018-3-6", 
        classification: ["Orchid", "Root", "Shrub"],
        image: require('../assets/banana.png'),
        sunlight:3,
        water:1,
        reminders:{
            fertilized:10,
            rotated:15,
            prunned:15,
            trimmed:15,
            replanted:12,
            watered:5,
        },
        completedTask:[false, false],
        deleteEntry:false,
        notes:"This is my favorite Banana",
    },
    {
        key:'3', 
        nickname:"Orange Fruit", 
        species:"Donald", 
        date: "2019-5-12", 
        classification: ["Succulent", "Tree", "Veggie"],
        image: require('../assets/orange.png'),
        sunlight:3,
        water:2,
        reminders:{
            fertilized:10,
            rotated:15,
            prunned:15,
            trimmed:15,
            replanted:12,
            watered:5,
        },
        completedTask:[false, false],
        deleteEntry:false,
        notes:"This is my favorite Orange",
    },
    {
        key:'guru', 
        nickname:"Apple Cider", 
        species:"Donald", 
        date: "2019-10-7", 
        classification: ["Vine", "Other"],
        image: require('../assets/cider.png'),
        sunlight:3,
        water:2,
        reminders:{
            fertilized:10,
            rotated:15,
            prunned:15,
            trimmed:15,
            replanted:12,
            watered:5,
        },
        completedTask:[false, false],
        deleteEntry:false,
        notes:"This is my favorite Cider",
    },

>>>>>>> Stashed changes
]

plantReminders = plantReminders.sort((a,b) =>{
    if(a.nickname.toLowerCase() > b.nickname.toLowerCase())
        return 1;
    else if(a.nickname.toLowerCase() < b.nickname.toLowerCase())
        return -1;
    else
        return 0;
})

<<<<<<< Updated upstream
export {myPlants, plantImages, plantReminders};
=======
plantReminders2 = plantReminders2.sort((a,b) =>{
    if(a.nickname.toLowerCase() > b.nickname.toLowerCase())
        return 1;
    else if(a.nickname.toLowerCase() < b.nickname.toLowerCase())
        return -1;
    else
        return 0;
})
export {plantReminders,plantReminders2};
>>>>>>> Stashed changes
