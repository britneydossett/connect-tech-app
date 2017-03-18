'use strict';
/**
  * MakeCard is what makes the homecards that the user gets in their app every time they ask for a news story
**/

module.exports = function (info, response, intent) {
    let image = 'https://typeset-beta.imgix.net/rehost%2F2016%2F9%2F13%2F93286f67-e48d-438f-8609-ac2d4e8feb29.jpg?w=740&h=437&fit=crop&crop=faces&auto=format&q=70';

    if (intent !== 'ron') {
        console.log('image', intent);
        image = intent;
    }

    response.card({
        type: 'Standard',
        title: 'Home Card!',
        text: `${info}`,
        image: {
            smallImageUrl: image,
            largeImageUrl: image
        }
    });
};
