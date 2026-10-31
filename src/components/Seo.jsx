import { useEffect } from 'react'
import { setPageMeta } from '../lib/seo'

export default function Seo({ title, description, image }) {
  useEffect(() => {
    setPageMeta({ title, description, image })
  }, [title, description, image])
  return null
}
