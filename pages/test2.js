const videoCard = CardFactory.videoCard(
    'Big Buck Bunny',  // Title of the card
    [{ url: 'http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_surround-fix.avi' }],  // List of video URLs
    { subtitle: 'by the Blender Institute', image: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217' },  // Subtitle and image for the card
    ['playVideo']  // List of buttons to be included
);

const reply = { type: ActivityTypes.Message };
reply.attachments = [videoCard];

await turnContext.sendActivity(reply);