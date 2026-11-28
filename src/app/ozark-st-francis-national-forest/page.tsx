import NewForestPage, { newForestMetadata } from '@/components/pages/new-forests/NewForestPage'
import { ozarkStFrancisNationalForest as content } from '@/content/defaults/ozark-st-francis-national-forest'

const PATH = '/ozark-st-francis-national-forest'

export const metadata = newForestMetadata(content, PATH)

export default function OzarkStFrancisNationalForestPage() {
  return <NewForestPage content={content} path={PATH} />
}
