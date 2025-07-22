import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx'
import { Zap, TrendingUp, Shield, Clock, Copy, CheckCircle, Loader2 } from 'lucide-react'
import qrCodeImage from './assets/TQf3Sx1WCzDkyjNwp3jh57HwDnTgMFNCaZ.png'
import './App.css'

function App() {
  const [amount, setAmount] = useState('')
  const [showPayment, setShowPayment] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [txnId, setTxnId] = useState('')
  const [liveTransactions, setLiveTransactions] = useState([])
  const [copied, setCopied] = useState(false)

  const depositAddress = 'TQf3Sx1WCzDkyjNwp3jh57HwDnTgMFNCaZ'
  const exchangeRate = 500 / 15 // 500 flash USDT = 15 real USDT
  
  const calculateRealUSDT = (flashAmount) => {
    return (parseFloat(flashAmount) / exchangeRate).toFixed(2)
  }

  const generateRandomTransaction = () => {
    const amounts = [500, 1000, 2500, 5000, 10000, 15000, 25000, 50000]
    const randomAmount = amounts[Math.floor(Math.random() * amounts.length)]
    const txId = Math.random().toString(36).substring(2, 15).toUpperCase()
    const timestamp = new Date().toLocaleTimeString()
    
    return {
      id: Math.random().toString(36).substring(2, 9),
      amount: randomAmount,
      txId: txId,
      timestamp: timestamp,
      status: 'Completed'
    }
  }

  useEffect(() => {
    // Initialize with some transactions
    const initialTransactions = Array.from({ length: 5 }, generateRandomTransaction)
    setLiveTransactions(initialTransactions)

    // Add new transaction every 3-8 seconds
    const interval = setInterval(() => {
      const newTransaction = generateRandomTransaction()
      setLiveTransactions(prev => [newTransaction, ...prev.slice(0, 9)]) // Keep only 10 transactions
    }, Math.random() * 5000 + 3000)

    return () => clearInterval(interval)
  }, [])

  const handleAmountChange = (e) => {
    const value = e.target.value
    if (value === '' || (parseFloat(value) >= 500 && parseFloat(value) <= 350000)) {
      setAmount(value)
    }
  }

  const handleBuyNow = () => {
    if (amount && parseFloat(amount) >= 500 && parseFloat(amount) <= 350000) {
      setShowPayment(true)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmitTxn = () => {
    if (txnId.trim()) {
      setShowPayment(false)
      setShowConfirmation(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-blue-800/30 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-yellow-400" />
              <h1 className="text-2xl font-bold text-white">Flash USDT</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-400 border-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Live
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Live Transactions Ticker */}
      <div className="bg-slate-800/50 border-b border-blue-800/30 py-2 overflow-hidden">
        <div className="animate-scroll whitespace-nowrap">
          <span className="text-green-400 text-sm">
            🔥 LIVE TRANSACTIONS: {liveTransactions.slice(0, 3).map(tx => 
              `${tx.amount} USDT - ${tx.txId} | `
            ).join('')}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold text-white">
                Flash <span className="text-yellow-400">USDT</span> Exchange
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Instant USDT exchange with the best rates. No registration required.
              </p>
              <div className="flex justify-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-400" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <span>Instant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                  <span>Best Rates</span>
                </div>
              </div>
            </div>

            {/* Exchange Card */}
            <Card className="bg-slate-800/50 border-blue-800/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  <span>Flash USDT Exchange</span>
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Exchange rate: 500 Flash USDT = 15 Real USDT (TRC20)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      Flash USDT Amount (500 - 350,000)
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter amount..."
                      value={amount}
                      onChange={handleAmountChange}
                      min="500"
                      max="350000"
                      className="bg-slate-700/50 border-blue-800/30 text-white placeholder-gray-400 text-lg h-12"
                    />
                  </div>
                  
                  {amount && parseFloat(amount) >= 500 && (
                    <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-800/30">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">You will receive:</span>
                        <span className="text-2xl font-bold text-green-400">
                          {calculateRealUSDT(amount)} USDT
                        </span>
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        Real USDT (TRC20 Network)
                      </div>
                    </div>
                  )}
                </div>

                <Button 
                  onClick={handleBuyNow}
                  disabled={!amount || parseFloat(amount) < 500 || parseFloat(amount) > 350000}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-3 text-lg"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Buy Flash USDT Now
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Live Transactions Sidebar */}
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-blue-800/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  <span>Live Transactions</span>
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Recent successful exchanges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {liveTransactions.map((tx) => (
                    <div key={tx.id} className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-green-400 font-semibold">
                            {tx.amount.toLocaleString()} USDT
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {tx.txId}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                            {tx.status}
                          </Badge>
                          <div className="text-xs text-gray-400 mt-1">
                            {tx.timestamp}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="bg-slate-800/50 border-blue-800/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Why Choose Flash USDT?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <div className="text-white font-medium">Secure & Safe</div>
                    <div className="text-sm text-gray-400">Advanced security protocols</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="h-5 w-5 text-yellow-400 mt-0.5" />
                  <div>
                    <div className="text-white font-medium">Instant Exchange</div>
                    <div className="text-sm text-gray-400">Lightning fast transactions</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <div className="text-white font-medium">Best Rates</div>
                    <div className="text-sm text-gray-400">Competitive exchange rates</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="bg-slate-800 border-blue-800/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              <span>Complete Payment</span>
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Send {calculateRealUSDT(amount)} USDT to the address below
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* QR Code */}
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-lg">
                <img src={qrCodeImage} alt="Payment QR Code" className="w-48 h-48" />
              </div>
            </div>

            {/* Payment Details */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300 block mb-2">
                  TRC20 Address
                </label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={depositAddress}
                    readOnly
                    className="bg-slate-700/50 border-blue-800/30 text-white text-sm"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(depositAddress)}
                    className="border-blue-800/30 text-white hover:bg-blue-800/30"
                  >
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-800/30">
                <div className="text-center">
                  <div className="text-sm text-gray-400">Amount to Pay</div>
                  <div className="text-2xl font-bold text-green-400">
                    {calculateRealUSDT(amount)} USDT
                  </div>
                  <div className="text-sm text-gray-400">TRC20 Network Only</div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 block mb-2">
                  Transaction ID
                </label>
                <Input
                  placeholder="Enter your transaction ID..."
                  value={txnId}
                  onChange={(e) => setTxnId(e.target.value)}
                  className="bg-slate-700/50 border-blue-800/30 text-white"
                />
              </div>

              <Button
                onClick={handleSubmitTxn}
                disabled={!txnId.trim()}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold"
              >
                Submit Transaction
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmation} onOpenChange={() => {}}>
        <DialogContent className="bg-slate-800 border-blue-800/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-400" />
              <span>Waiting for Confirmation</span>
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Your transaction is being processed
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <Loader2 className="h-16 w-16 text-yellow-400 animate-spin" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">
                Blockchain Confirmation in Progress
              </h3>
              <p className="text-gray-400">
                Please wait while we confirm your transaction on the blockchain.
                This usually takes 1-3 minutes.
              </p>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Flash USDT Amount:</span>
                <span className="text-white font-semibold">{amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Real USDT Paid:</span>
                <span className="text-green-400 font-semibold">{calculateRealUSDT(amount)} USDT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Transaction ID:</span>
                <span className="text-white font-mono text-sm">{txnId}</span>
              </div>
            </div>

            <div className="text-sm text-gray-400">
              Your Flash USDT will be credited automatically once confirmed.
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App

