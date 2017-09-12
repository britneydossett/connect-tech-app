'use strict';
/**
  * MakeCard is what makes the homecards that the user gets in their app every time they ask for a news story
**/

module.exports = function (info, response, image) {
    let picture = 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwjx-IqX5-rSAhUp0YMKHU99DIYQjRwIBw&url=http%3A%2F%2Fswansonquotes.com%2Ftag%2Ftammy%2F&psig=AFQjCNH4MgvwWW1VmMkitYufwqsh9U1CSg&ust=1490295945335488';

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
