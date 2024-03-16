const db = require('../db')

class Post {
    static async listPosts(){
//    fetch a user rating for a post, if one exists
    }
    static async fetchPostById(postId){
        //check if user has already add a rating for this post
        // and throw an error if they have
        // other wise insert the record into the db
    }

    static async createNewPost({user, post}){

    }

    static async editPost({postId,postUpdate}){
        
    }

}

module.exports = Rating