import NewForestPage, { newForestMetadata } from '@/components/pages/new-forests/NewForestPage'
import { whiteRockMountain as content } from '@/content/defaults/white-rock-mountain'

const PATH = '/ozark-st-francis-national-forest/white-rock-mountain'

export const metadata = newForestMetadata(content, PATH)

export default function WhiteRockMountainPage() {
  return <NewForestPage content={content} path={PATH} />
}
