'use client';

import { useEffect, useState } from 'react';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { getWalletBalance, getWalletTransactions } from '@/lib/api';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { WalletBalance, WalletTransaction } from '@/types';
import { useAppSelector } from '@/store/hooks';

function WalletContent() {
  const { accessToken } = useAppSelector((state) => state.auth);
  const [balance, setBalance] = useState<WalletBalance | null>(null);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;
    void Promise.all([
      getWalletBalance(accessToken),
      getWalletTransactions(accessToken),
    ]).then(([bal, txns]) => {
      setBalance(bal);
      setTransactions(txns);
      setLoading(false);
    });
  }, [accessToken]);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading wallet...</p>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h1 className="text-xl font-semibold text-gray-900">OnnRide Wallet</h1>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-brand-700">
            {formatCurrency(balance?.balance ?? '0')}
          </p>
          <p className="mt-1 text-sm text-gray-500">Apply wallet balance at checkout</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900">Recent transactions</h2>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-sm text-gray-500">No transactions yet.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {transactions.map((tx) => (
                <li key={tx.id} className="flex justify-between py-3 text-sm">
                  <div>
                    <p className="font-medium text-gray-900">{tx.type}</p>
                    <p className="text-gray-500">{tx.description ?? formatDate(tx.createdAt)}</p>
                  </div>
                  <span className={tx.type === 'CREDIT' ? 'text-green-600' : 'text-gray-900'}>
                    {tx.type === 'CREDIT' ? '+' : '-'}
                    {formatCurrency(tx.amount)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function WalletPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-8 sm:px-6">
      <AuthGuard>
        <WalletContent />
      </AuthGuard>
    </div>
  );
}
