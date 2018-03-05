export default class Brewery {
    username;
    hasChangingTables;
    hasFamilyRestroom;
    isWheelchairAccessible;
    seatingArrangements;
    kidFriendly;
    safety;
    petFriendly;
    foodOptionDiversity;
    nonAlcoholicOptions;
    soundLevel;
    isSmokingPermitted;
    strollerKids;
    kThroughSix;
    teenagers;
    comments;

    merge(res) {
        this.username = res.username;
        this.hasChangingTables = res.hasChangingTables;
        this.hasFamilyRestroom = res.hasFamilyRestroom;
        this.isWheelchairAccessible = res.isWheelchairAccessible;
        this.seatingArrangements = res.seatingArrangements;
        this.kidFriendly = res.kidFriendly;
        this.safety = res.safety;
        this.petFriendly = res.petFriendly;
        this.foodOptionDiversity = res.foodOptionDiversity;
        this.nonAlcoholicOptions = res.nonAlcoholicOptions;
        this.soundLevel = res.soundLevel;
        this.isSmokingPermitted = res.isSmokingPermitted;
        this.strollerKids = res.strollerKids;
        this.kThroughSix = res.kThroughSix;
        this.teenagers = res.teenagers;
        this.comments = res.comments;
    }
}