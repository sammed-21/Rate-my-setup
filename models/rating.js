const db = require('../db')

class Rating {
    static async fetchRatingForPostByUser({ user, postId}){
//    fetch a user rating for a post, if one exists
    }
    static async createRatingForPost({rating, user, postId}){
        //check if user has already add a rating for this post
        // and throw an error if they have
        // other wise insert the record into the db
    }

}

module.exports = Rating