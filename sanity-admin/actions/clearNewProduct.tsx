import type { DocumentActionComponent } from 'sanity'
import { useClient } from 'sanity'

const NEW_PRODUCT_IDS = ['new-product', 'drafts.new-product']
const PRODUCT_FIELDS = [
  'title',
  'slug',
  'tag',
  'metaImage',
  'price',
  'description',
  'sections',
  'seo'
]

export const ClearNewProductAction: DocumentActionComponent = props => {
  const client = useClient({ apiVersion: '2024-01-01' })
  const { id } = props

  if (!NEW_PRODUCT_IDS.includes(id)) {
    return null
  }

  return {
    label: 'Clear for new product',
    tone: 'caution',
    onHandle: () => {
      client
        .transaction()
        .patch(id, p => p.unset(PRODUCT_FIELDS))
        .commit()
        .then(() => {
          window.location.reload()
        })
    }
  }
}
