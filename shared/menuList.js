const price = 5.00;

const MENULIST = {
    
    1: {
        id:  'Sunday-Special',
        imageName: 'pizza1',
        name: 'Pizza',
        price: price,
        description: "A fresh pizza pie",
        hidden: false
    },
    2: {
        id:  'Monday-Special',
        imageName: 'bread',
        name: 'Bread',
        price: price,
        description: "One Bread please.",
        hidden: false
    },
    3: {
        id:  'Tuesday-Special',
        imageName: 'quiche',
        name: 'Quiche',
        price: price,
        description: "Et Tu Quiche?",
        hidden: false
    },
    4: {
        id:  'Wednesday-Special',
        imageName: 'sandwich',
        name: 'Sandwich',
        price: price,
        description: "Made from 100% recycled ingredients",
        hidden: false
    },
    5: {
        id:  'Thursday-Special',
        imageName: 'sausage',
        name: 'Sausage',
        price: price,
        description: "Sublime and mysterious",
        hidden: false
    },
    5: {
        id:  'Friday-Special',
        imageName: 'tuna',
        name: 'Tuna',
        price: price,
        description: "Chicken of the Sea",
        hidden: false
    },
    5: {
        id:  'Saturday-Special',
        name: 'Chicken',
        imageName: 'chicken',
        price: price,
        description: "Chicken of the land.",
        hidden: false
    }
}

//console.log(Object.values(MENULIST));

export default MENULIST;