# Family Friendly Brewery Trackr

Version 1.0

Family Friendly Brewery Trackr allows users to view and contribute tocrowdsourced reviews for breweries based on family friendly criteria. 

Available for ios and Android!

Release Notes:
- Features:
  - Breweries can be viewed from a map and selected to see aggregated as well as individual reviews for the brewery based on their family friendliness. This is based on current location or an input location
  - Users can submit a review for a brewery which will be aggregated with the other reviews on a given brewery page. These reviews show up on the reviews tab of the application
  - Users can favorite breweries and see the see their favorited breweries from the favorites screen
  - Review and brewery lists can be sorted by name, distance, and rating
  - Users can register with email and set a username, profile picture, description, age, and number of kids
  - Users can view other user's reviews and profiles in full 
 - Bug Fixes:
   - Favoriting breweries with "."s in their name no longer crashes app
   - Brewery location sorting works
   - Images can be any variable size, not limited to small pictures for profiles
   - Current location dot doesn't travel to queried location on map screen
  - Known bugs/defects
    - Back button dialog doesn't show on Android when clicking back after going to main screen without changing tabs
    - Brewery list doesn't use database values for sorting, uses Google values - this should be fixed
    - No settings function - can't change search distance on map or color theme of app
    - No ability to add pictures of breweries in a review

Installation/Build Guide:
1. Install npm https://www.npmjs.com/
2. Download or clone the repository https://github.com/FFBreweryTrackr/JuniorDesignBrewery.git
3. Navigate to the folder containing the repository and run "npm install" - this will take a while and install all necessary libraries.
4. Install expo (https://docs.expo.io/versions/latest/introduction/installation) 
5. Obtain a Firebase key by going to console.firebase.google.com, signing in, and going to "Project Settings" (click the gear icon next to "Project Overview" and clicking "add firebase to your web app." Create a file called "firebase.js" and copy/paste the following into it. Then, copy over the values for each field in "config". 

import * as firebase from 'firebase';

var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

export default firebaseApp = firebase.initializeApp(config);

6. Open expo, create an account, and sign in
7. Click "Open Existing Project" and open the folder containing the repository
8. After the build completes in expo, click "share" and scan the barcode from the mobile application. If you run into an error while loading the app, try clicking the "restart" button - if this still doesn't fix the issue, close and reopen expo on your phone and computer. The app will take a while to load the first time it's loaded from your computer to your phone. 
9. To build standalone android/ios app, follow the instructions found here: 
  https://docs.expo.io/versions/latest/distribution/building-standalone-apps - App can be pushed to the ios app store from here
  
This application is licensed under the GNU General Public License v3.0
  
The icon for the application is attributed to "brewery by Vicons Design from the Noun Project" used under the Creative Commons license https://creativecommons.org/licenses/by/3.0/legalcode
