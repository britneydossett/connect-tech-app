'use strict';
/**
  * MakeCard is what makes the homecards that the user gets in their app every time they ask for a news story
**/

module.exports = function (info, response) {

    response.card({
        type: 'Standard',
        title: 'Home Card!',
        text: `${info}`,
        image: {
            smallImageUrl: '',
            largeImageUrl: ''
        }
    });
};
