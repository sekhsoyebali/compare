import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { allCryptos, CryptoData } from '@/app/blockchains'
import ClientComparePage from './ClientComparePage'

type ComparisonItem = CryptoData & {
  color: string
}

const colors = ['bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-yellow-500']

type Props = {
  params: { cryptos: string[] }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cryptoIds = params.cryptos[0].split('-vs-').map(id => id.toLowerCase())
  const validCryptos = cryptoIds.every(id => Object.values(allCryptos).some(crypto => crypto.id === id))

  if (!validCryptos) {
    notFound()
  }

  const title = cryptoIds.map(id => Object.values(allCryptos).find(crypto => crypto.id === id)?.name).join(' vs ')
  return { title: `${title} Comparison` }
}

export default function ComparePage({ params }: Props) {
  const cryptoIds = params.cryptos[0].split('-vs-').map(id => id.toLowerCase())
  const initialComparisons: ComparisonItem[] = cryptoIds
    .map((id, index) => {
      const crypto = Object.values(allCryptos).find(c => c.id === id)
      return {
        ...crypto,
        color: colors[index % colors.length]
      }
    })
    .filter((item): item is ComparisonItem => !!item)
    .sort((a, b) => a.name.localeCompare(b.name));

  return <ClientComparePage initialComparisons={initialComparisons} />
}