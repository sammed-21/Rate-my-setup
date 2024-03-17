const db = require('../db')
const { BadRequestError, NotFoundError } = require('../utils/errors')
class Post {
    static async listPosts() {
        //    fetch a user rating for a post, if one exists
        const results = await db.query(
            `SELECT p.id,
                    p.caption,
                    p.image_url AS "imageUrl",
                    p.user_id AS "userId",
                    u.email AS "userEmail",
                    p.created_at AS "updatedAt"
                    FROM posts AS p 
                    JOIN users AS u ON u.id=p.user_id
                    ORDER BY p.created_at DESC`
        )
        return results.rows[0]
    }
    static async fetchPostById(postId) {
        //check if user has already add a rating for this post
        // and throw an error if they have
        // other wise insert the record into the db
        const results = await db.query(
            `SELECT p.id,
                    p.caption,
                    p.image_url AS "imageUrl",
                    p.user_id AS "userId",
                    u.email AS "userEmail",
                    p.created_at AS "updatedAt"
                    FROM posts AS p 
                    JOIN users AS u ON u.id=p.user_id
                    WHERE p.id=$1`
            , [postId])
        const post = results.rows[0]
        if (!post) {
            throw new NotFoundError();
        }
        return post;
    }

    static async createNewPost({ user, post }) {

        // create a new post
        const requireFields = ['caption', 'imageUrl']
        requireFields.forEach(field => {
            if (!post.hasOwnProperty(field)) {
                throw new BadRequestError(`required field -${field} - missing from request body`)
            }
        })
        if (post.caption.length > 140) {
            throw new BadRequestError(`post caption must be 140 character or less`)
        }
        const result = await db.query(
            `INSERT INTO posts (caption, image_url, user_id)
            VALUES ($1, $2, (SELECT id FROM users WHERE email= $3))
            RETURNING id,
            caption,
            user_id AS "userId",
            image_url AS "imageUrl",
            created_at AS "createdAt",
            updated_at AS "updatedAt"
            
             `, [post.caption, post.imageUrl, user.email]
        )
        return result.rows[0]

    }

    static async editPost({ postId, postUpdate }) {
        const requireFields = ['caption']
        requireFields.forEach(field => {
            if (!postUpdate.hasOwnProperty(field)) {
                throw new BadRequestError(`required field -${field} - missing from request body`)
            }
        })
        const result = await db.query(  
            `
            UPDATE posts 
            SET caption =$1,
                updated_at = NOW()
                WHERE id=$2
                RETURNING id,
                          caption,
                          image_url AS "imageUrl",
                          user_id AS "userId",
                          created_at AS "createdAt",
                          updated_at AS "updatedAt"
            
            `,[postUpdate.caption,postId]
        )
        return result.rows[0]
    }

}

module.exports = Post