'use client';

import React from 'react';
import { ComparisonSection } from '@/components/ComparisonSection'
import ComparisonCharts from '@/components/ComparisonCharts'
import { CryptoData } from '@/app/blockchains'

type ComparisonItem = CryptoData & {
  color: string
}

type ClientComparePageProps = {
  initialComparisons: ComparisonItem[]
}

const ClientComparePage: React.FC<ClientComparePageProps> = ({ initialComparisons }) => {
  return (
    <main className="flex-grow container mx-auto p-4 space-y-8">
      <ComparisonSection initialComparisons={initialComparisons} />
      <ComparisonCharts comparisons={initialComparisons} />
    </main>
  )
}

export default ClientComparePage;