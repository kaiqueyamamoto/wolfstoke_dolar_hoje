'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
// import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';

// function ConverterModal({ dollarQuote }: { dollarQuote: number | null }) {
//   const [dollarAmount, setDollarAmount] = useState<string>('')
//   const [realAmount, setRealAmount] = useState<string>('')

//   useEffect(() => {
//     if (dollarQuote && dollarAmount) {
//       const converted = (parseFloat(dollarAmount) * dollarQuote).toFixed(2)
//       setRealAmount(converted)
//     } else {
//       setRealAmount('')
//     }
//   }, [dollarAmount, dollarQuote])

//   return (
//     <DialogContent className="text-white">
//       <DialogHeader>
//         <DialogTitle>Calculadora de Conversão</DialogTitle>
//         <DialogDescription>
//           Converta dólares para reais usando a cotação atual.
//         </DialogDescription>
//       </DialogHeader>
//       <div className="grid gap-4 py-4">
//         <div className="grid grid-cols-4 items-center gap-4">
//           <label htmlFor="dollarAmount" className="text-right">
//             USD
//           </label>
//           <Input
//             id="dollarAmount"
//             value={dollarAmount}
//             onChange={(e) => setDollarAmount(e.target.value)}
//             className="col-span-3"
//             type="number"
//             placeholder="Digite o valor em dólar"
//           />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//           <label htmlFor="realAmount" className="text-right">
//             BRL
//           </label>
//           <Input
//             id="realAmount"
//             value={realAmount}
//             className="col-span-3"
//             type="text"
//             readOnly
//             placeholder="Valor convertido em reais"
//           />
//         </div>
//       </div>
//     </DialogContent>
//   )
// }

export default function DollarQuotePage() {
  const [dollarQuote, setDollarQuote] = useState<number | null>(null);
  const [previousQuote, setPreviousQuote] = useState<number | null>(null);
  const [isIncreasing, setIsIncreasing] = useState<boolean | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchDollarQuote = async () => {
      try {
        const response = await fetch(
          'https://economia.awesomeapi.com.br/json/last/USD-BRL',
        );
        const data = await response.json();
        const newQuote = parseFloat(data.USDBRL.bid);

        setPreviousQuote(dollarQuote);
        setDollarQuote(newQuote);
        setIsIncreasing(
          previousQuote !== null ? newQuote > previousQuote : null,
        );
      } catch (error) {
        console.error('Erro ao buscar cotação do dólar:', error);
      }
    };

    fetchDollarQuote();

    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          fetchDollarQuote();
          return 0;
        }
        return oldProgress + 100 / 30;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [dollarQuote, previousQuote]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white p-4">
      <Card className="w-full max-w-md bg-black border-2 border-white rounded-none">
        <CardContent className="flex flex-col items-center p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Dólar Hoje – Cotação do Dólar em Tempo Real
          </h1>

          <h2 className="text-xl font-semibold mb-4">
            Qual é o valor do dólar agora?
          </h2>

          <div className="text-6xl font-bold mb-2">
            {dollarQuote ? `R$ ${dollarQuote.toFixed(2)}` : 'Carregando...'}
          </div>

          {isIncreasing !== null && (
            <div
              className={`flex items-center ${
                isIncreasing ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {isIncreasing ? (
                <ArrowUpIcon className="mr-1" />
              ) : (
                <ArrowDownIcon className="mr-1" />
              )}
              {isIncreasing ? 'Subindo' : 'Caindo'}
            </div>
          )}

          {/* <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="mt-4">
                Calculadora de Conversão
              </Button>
            </DialogTrigger>
            <ConverterModal dollarQuote={dollarQuote} />
          </Dialog> */}

          <p className="text-sm mt-4">
            A cotação do dólar é atualizada em tempo real. Fique por dentro das
            variações para saber se o dólar está subindo ou caindo. Assim, você
            pode tomar decisões mais conscientes na hora de comprar, vender ou
            até mesmo investir.
          </p>

          <div className="w-full mt-6">
            <Progress value={progress} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
