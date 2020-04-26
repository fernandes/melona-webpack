import { Database } from '@nozbe/watermelondb'
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs'

import schema from './model/schema'
import Post from './model/Post'
import Comment from './model/Comment'

// First, create the adapter to the underlying database:
const adapter = new LokiJSAdapter({
  schema,
  // These two options are recommended for new projects:
  useWebWorker: false,
  useIncrementalIndexedDB: false, // << I disable because I got several problems on client side
  // It's recommended you implement this method:
  // onIndexedDBVersionChange: () => {
  //   // database was deleted in another browser tab (user logged out), so we must make sure we delete
  //   // it in this tab as well
  //   if (checkIfUserIsLoggedIn()) {
  //     window.location.reload()
  //   }
  // },
})

// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: [
    Post, Comment // ⬅️ You'll add Models to Watermelon here
  ],
  actionsEnabled: true,
})

async function loadData() {
  return await database.action(async () => {
    const postsCollection = await database.collections.get('posts')

    // Uncomment just in cause you wanna create some record
    // const newPost = await postsCollection.create(post => {
    //   post.title = 'First Post'
    //   post.body = 'Lorem ipsum...'
    // })

    // this is how you can look for it
    // const postId = newPost.id
    // const post = await postsCollection.find(postId)

    const allPosts = await postsCollection.query().fetch()
    return allPosts
  }) 
}

export default loadData()
