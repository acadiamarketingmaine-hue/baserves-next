import NewForestPage, { newForestMetadata } from '@/components/pages/new-forests/NewForestPage'
import { rogueRiverSiskiyouNationalForest as content } from '@/content/defaults/rogue-river-siskiyou-national-forest'

const PATH = '/rogue-river-siskiyou-national-forest'

export const metadata = newForestMetadata(content, PATH)

export default function RogueRiverSiskiyouNationalForestPage() {
  return <NewForestPage content={content} path={PATH} />
}
