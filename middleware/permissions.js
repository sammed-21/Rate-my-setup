const Post = require("../models/post")
const {BadRequestError,ForbiddenError}= require('../utils/errors')

// ensure authenicated user is owner of post

const authedUserOwnsPost = async(req,res,next)=>{
    try {
        const {user} = res.locals
        const {postId} = req.params
            const post = await Post.fetchPostById(postId);
            if(post.userEmail !== user.email){
throw new ForbiddenError(`User is not allowed to update other user's posts`)
            }
            res.locals.post =post
            return next()
    } catch (error) {
        return next(error);
        
    }
}

module.exports ={
    authedUserOwnsPost
}