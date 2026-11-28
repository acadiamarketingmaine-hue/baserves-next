import NewForestPage, { newForestMetadata } from '@/components/pages/new-forests/NewForestPage'
import { alleghenyNationalForest as content } from '@/content/defaults/allegheny-national-forest'

const PATH = '/allegheny-national-forest'

export const metadata = newForestMetadata(content, PATH)

export default function AlleghenyNationalForestPage() {
  return <NewForestPage content={content} path={PATH} />
}
