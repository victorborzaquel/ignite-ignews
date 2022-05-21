import { GetStaticProps } from 'next'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'
import styles from './home.module.scss'

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>

          <h1>News about the <span>React</span> world</h1>

          <p>
            Get access to all the publications<br />
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

// Client Side (Mais rápido, Carregada com uma ação do usuário) (Ex: Comentários rede social) (fetch ou axios)
// Server Side (Precisa de Indexação no Google, etc...) (Ex: Post Rede Social) (getServerSideProps)
// Static site generation (Pode exibir a mesma informação para todo mundo, atualiza em tempo pre-definido) (Ex: Preço de Venda) (getStaticProps)

// getServerSideProps
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1L1ZbRAuTD8vTCt0mE9cvOjN')

  const formatPrice = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount / 100)
  const dayInSeconds = 60 * 60 * 24 // 24 hours

  const product = {
    priceId: price.id,
    amount: formatPrice(price.unit_amount)
  }

  return {
    props: { product },
    revalidate: dayInSeconds
  }
}