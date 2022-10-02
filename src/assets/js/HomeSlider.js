new Splide('.latestproducts', {
    perPage: 4,
    focus: '',
    breakpoints: {
        1000: {
            perPage: 3
        },
        700: {
            perPage: 2
        },
        400: {
            perPage: 1
        }
    },
    
}).mount();

new Splide('.popularproducts', {
    type: 'loop',
    perPage: 4,
    focus: 'center',
    breakpoints: {
        1000: {
            perPage: 3
        },
        700: {
            perPage: 2
        },
        400: {
            perPage: 1
        }
    },
}).mount();