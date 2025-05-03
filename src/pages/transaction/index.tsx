import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useTransactions } from './hooks/useTransactions';
import TransactionList from './components/TransactionTable';
import TransactionFilters from './components/TransactionFilters';
import DashboardLayout from '../../components/layout/DashboardLayout'
import Header from '../../components/layout/header'
import { formatCurrency } from '../../utils/format';
import StatisticsCard from '../../components/ui/StatisticsCard';

const TransactionPage: React.FC = () => {
  const [filters, setFilters] = useState<any>({});
  const { 
    transactions, 
    isLoading, 
    total, 
    page, 
    pageSize, 
    handlePageChange, 
    handlePageSizeChange 
  } = useTransactions(filters);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleFilter = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleReset = () => {
    setFilters({});
  };

  // Calculate totals and summary
  const summary = useMemo(() => {
    const totals = {
      sales: 0,
      purchases: 0,
      expenses: 0,
      finance: 0,
    };

    transactions?.forEach(transaction => {
      switch (transaction.type) {
        case 'SALE':
          totals.sales += transaction.amount;
          break;
        case 'PURCHASE':
          totals.purchases += transaction.amount;
          break;
        case 'EXPENSE':
          totals.expenses += transaction.amount;
          break;
        case 'FINANCE':
          totals.finance += transaction.amount;
          break;
      }
    });

    const netProfit = totals.sales - (totals.purchases + totals.expenses);
    const remainingCash = totals.sales + totals.finance - (totals.purchases + totals.expenses);

    return {
      ...totals,
      netProfit,
      remainingCash
    };
  }, [transactions]);

  return (
    <DashboardLayout>
      <Header Title='Cash Flow' date={date} setDate={setDate}/>
      <div className="container mx-2 py-4 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatisticsCard
            title="Total Sales"
            value={formatCurrency(summary.sales)}
            percentage="+20.1% from last week"
            percentageColor="text-black"
            chartData={[
              { name: 'Mon', value: 2000 },
              { name: 'Tue', value: 2200 },
              { name: 'Wed', value: 2100 },
              { name: 'Thu', value: 2050 },
              { name: 'Fri', value: 2150 },
              { name: 'Sat', value: 2500 },
              { name: 'Sun', value: 3200 },
            ]}
            chartType="line"
            chartColor="#000"
            valueColor="text-black"
          />
          <StatisticsCard
            title="Total Purchases"
            value={formatCurrency(summary.purchases)}
            percentage="+10.5% from last week"
            percentageColor="text-black"
            chartData={[
              { name: 'Mon', value: 800 },
              { name: 'Tue', value: 900 },
              { name: 'Wed', value: 850 },
              { name: 'Thu', value: 950 },
              { name: 'Fri', value: 1000 },
              { name: 'Sat', value: 1100 },
              { name: 'Sun', value: 1200 },
            ]}
            chartType="bar"
            chartColor="#000"
            valueColor="text-black"
          />
          <StatisticsCard
            title="Total Expenses"
            value={formatCurrency(summary.expenses)}
            percentage="+5.2% from last week"
            percentageColor="text-black"
            chartData={[
              { name: 'Mon', value: 400 },
              { name: 'Tue', value: 420 },
              { name: 'Wed', value: 410 },
              { name: 'Thu', value: 430 },
              { name: 'Fri', value: 450 },
              { name: 'Sat', value: 470 },
              { name: 'Sun', value: 500 },
            ]}
            chartType="bar"
            chartColor="#000"
            valueColor="text-black"
          />
          <StatisticsCard
            title="Total Finance"
            value={formatCurrency(summary.finance)}
            percentage="+8.3% from last week"
            percentageColor="text-black"
            chartData={[
              { name: 'Mon', value: 600 },
              { name: 'Tue', value: 650 },
              { name: 'Wed', value: 620 },
              { name: 'Thu', value: 700 },
              { name: 'Fri', value: 750 },
              { name: 'Sat', value: 800 },
              { name: 'Sun', value: 900 },
            ]}
            chartType="line"
            chartColor="#000"
            valueColor="text-black"
          />
        </div>

        {/* Profit and Cash Summary */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between px-2 mt-4">
          <div className="flex-1 flex flex-col items-center bg-white border border-black/10 rounded-lg py-4 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wide text-black/70 mb-1">Net Profit</span>
            <span className="text-4xl font-extrabold text-black leading-tight">{formatCurrency(summary.netProfit)}</span>
          </div>
          <div className="hidden md:block h-12 w-px bg-black/10 mx-4" />
          <div className="flex-1 flex flex-col items-center bg-white border border-black/10 rounded-lg py-4 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wide text-black/70 mb-1">Remaining Cash</span>
            <span className="text-4xl font-extrabold text-black leading-tight">{formatCurrency(summary.remainingCash)}</span>
          </div>
        </div>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <TransactionFilters
                onFilter={handleFilter}
                onReset={handleReset}
                onAddTransaction={() => {}}
              />
              
              <TransactionList
                transactions={transactions}
                loading={isLoading}
                total={total}
                page={page}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                onView={() => {}}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TransactionPage; 