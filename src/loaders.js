import DataLoader from 'dataloader'
import { Comment } from './db'

const findCommentsLoader = new DataLoader(async posts => {
  const comments = await Comment.query().whereIn('post_id', posts.map(p => p.id))
  return posts.map(p => comments.filter(c => c.post_id === p.id))
})

export default findCommentsLoader
