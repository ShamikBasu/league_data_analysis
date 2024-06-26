import Image from 'next/image'
import { AppLayout } from '../../components/AppLayout'

export default function NewPost(props) {
  return (
    <div>This is NewPost PAGE</div>
  )
}

NewPost.getLayout = function getLayout(page, pageProps){
  return <AppLayout{...pageProps}>{page}</AppLayout>
}
