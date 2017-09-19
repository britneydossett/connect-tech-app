'use strict';
/**
  * MakeCard is what makes the homecards that the user gets in their app every time they ask for a news story
**/

module.exports = function (info, response, image) {
    let picture = 'https://wolfandiron.com/wp-content/uploads/2013/07/Ron-Swanson-AP-485x337.jpg';

    if (image !== 'ron') {
        picture = image;
    }
    response.card({
        type: 'Standard',
        title: 'Home Card!',
        text: `${info}`,
        image: {
            smallImageUrl: picture,
            largeImageUrl: picture
        }
    });
};
