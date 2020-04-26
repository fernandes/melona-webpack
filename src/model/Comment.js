import { Model } from '@nozbe/watermelondb'
import { relation } from '@nozbe/watermelondb/decorators'

export default class Comment extends Model {
  static table = 'comments'
  static associations = {
    posts: { type: 'belongs_to', key: 'post_id' },
  }

  @relation('posts', 'post_id') post
  @relation('users', 'author_id') author
}
