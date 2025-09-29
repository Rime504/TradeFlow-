import React, { useState, useRef } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Badge } from './components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import { Separator } from './components/ui/separator';
import { Progress } from './components/ui/progress';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { 
  Upload, 
  Download, 
  FileText, 
  Users, 
  TrendingUp, 
  Settings, 
  LogOut, 
  ArrowLeft, 
  ArrowRight,
  Eye,
  Check,
  Plus,
  BarChart3,
  Clock,
  Package,
  FileCheck
} from 'lucide-react';

// Types
interface Invoice {
  id: string;
  fileName: string;
  product: string;
  buyer: string;
  quantity: number;
  price: number;
  status: 'pending' | 'processed' | 'completed';
  createdAt: string;
  file?: File;
}

interface User {
  email: string;
  name: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('welcome');
  const [user, setUser] = useState<User | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      fileName: 'invoice-2024-001.pdf',
      product: 'Electronic Components',
      buyer: 'Tech Corp Ltd',
      quantity: 500,
      price: 15000,
      status: 'completed',
      createdAt: '2024-09-25'
    },
    {
      id: '2',
      fileName: 'invoice-2024-002.pdf',
      product: 'Textile Materials',
      buyer: 'Fashion Inc',
      quantity: 200,
      price: 8500,
      status: 'processed',
      createdAt: '2024-09-26'
    },
    {
      id: '3',
      fileName: 'invoice-2024-003.pdf',
      product: 'Industrial Equipment',
      buyer: 'Manufacturing Co',
      quantity: 50,
      price: 45000,
      status: 'pending',
      createdAt: '2024-09-28'
    }
  ]);

  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const [extractedData, setExtractedData] = useState({
    product: '',
    buyer: '',
    quantity: '',
    price: ''
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Navigation functions
  const navigateTo = (screen: string, invoice?: Invoice) => {
    setCurrentScreen(screen);
    if (invoice) {
      setCurrentInvoice(invoice);
      setExtractedData({
        product: invoice.product,
        buyer: invoice.buyer,
        quantity: invoice.quantity.toString(),
        price: invoice.price.toString()
      });
    }
  };

  const handleLogin = (email: string) => {
    setUser({ email, name: email.split('@')[0] });
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('welcome');
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    // Simulate data extraction
    const mockData = {
      product: 'Sample Product',
      buyer: 'Sample Buyer Corp',
      quantity: '100',
      price: '5000'
    };
    setExtractedData(mockData);
  };

  const handleDataExtraction = () => {
    if (!extractedData.product || !extractedData.buyer || !extractedData.quantity || !extractedData.price) {
      alert('Please fill in all required fields');
      return;
    }

    const newInvoice: Invoice = {
      id: Date.now().toString(),
      fileName: uploadedFile?.name || 'new-invoice.pdf',
      product: extractedData.product,
      buyer: extractedData.buyer,
      quantity: parseInt(extractedData.quantity),
      price: parseFloat(extractedData.price),
      status: 'processed',
      createdAt: new Date().toISOString().split('T')[0],
      file: uploadedFile || undefined
    };

    setInvoices(prev => [newInvoice, ...prev]);
    setCurrentInvoice(newInvoice);
    setCurrentScreen('document-generation');
  };

  // Screen Components
  const WelcomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">TradeFlow</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setCurrentScreen('login')}>
              Login
            </Button>
            <Button onClick={() => setCurrentScreen('login')}>
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Futuristic Export Document Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload invoices, extract data, generate documents instantly
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              onClick={() => setCurrentScreen('login')}
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-3"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative max-w-4xl mx-auto">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1554224155-cfa08c2a758f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwZG9jdW1lbnRzJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTkxNTIxNTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Futuristic document technology"
            className="w-full h-64 object-cover rounded-xl shadow-2xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Upload className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Upload Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Drag and drop or upload invoice files in multiple formats
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <BarChart3 className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Auto Data Extraction</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                AI-powered extraction of key invoice data and details
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileCheck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Generate Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Automatically create export documents and customs declarations
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Clock className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <CardTitle>History Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Track and manage all your processed documents in one place
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">TradeFlow</span>
            </div>
            <div className="flex space-x-6">
              <button onClick={() => setCurrentScreen('privacy')} className="text-gray-300 hover:text-white">Privacy</button>
              <button onClick={() => setCurrentScreen('terms')} className="text-gray-300 hover:text-white">Terms</button>
              <button onClick={() => setCurrentScreen('contact')} className="text-gray-300 hover:text-white">Contact</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );

  const LoginSignupPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (email && password) {
        handleLogin(email);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">TradeFlow</span>
              </div>
              <CardTitle>{isLogin ? 'Welcome Back' : 'Create Account'}</CardTitle>
              <CardDescription>
                {isLogin ? 'Sign in to your account' : 'Sign up to get started'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  {isLogin ? 'Sign In' : 'Sign Up'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <Button
                    variant="link"
                    className="p-0 ml-1"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </Button>
                </p>
                {isLogin && (
                  <Button variant="link" className="p-0 text-sm">
                    Forgot password?
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Button
            variant="ghost"
            className="mt-4"
            onClick={() => setCurrentScreen('welcome')}
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  };

  const Dashboard = () => {
    const stats = {
      pending: invoices.filter(inv => inv.status === 'pending').length,
      processed: invoices.filter(inv => inv.status === 'processed').length,
      total: invoices.length
    };

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TradeFlow</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentScreen('profile')}
              >
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Manage your export documents and invoices</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
                <Clock className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pending}</div>
                <p className="text-xs text-muted-foreground">Awaiting processing</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Processed Invoices</CardTitle>
                <Check className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.processed}</div>
                <p className="text-xs text-muted-foreground">Ready for download</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
                <FileText className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              onClick={() => setCurrentScreen('upload')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="mr-2 w-4 h-4" />
              Upload New Invoice
            </Button>
            <Button 
              variant="outline"
              onClick={() => setCurrentScreen('history')}
            >
              <Eye className="mr-2 w-4 h-4" />
              View History
            </Button>
          </div>

          {/* Recent Invoices */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
              <CardDescription>Your latest uploaded invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.slice(0, 3).map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <FileText className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="font-medium">{invoice.fileName}</p>
                        <p className="text-sm text-gray-600">{invoice.product} • {invoice.buyer}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge 
                        variant={invoice.status === 'completed' ? 'default' : 
                                invoice.status === 'processed' ? 'secondary' : 'outline'}
                      >
                        {invoice.status}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigateTo('data-extraction', invoice)}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const UploadInvoicePage = () => {
    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      if (files[0]) {
        handleFileUpload(files[0]);
      }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        handleFileUpload(e.target.files[0]);
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setCurrentScreen('dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TradeFlow</span>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Invoice</h1>
            <p className="text-gray-600">Upload your invoice file to extract data and generate documents</p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
              >
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Drop your invoice here</h3>
                <p className="text-gray-600 mb-4">or click to browse files</p>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Choose File
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileSelect}
                />
                <p className="text-sm text-gray-500 mt-4">
                  Supported formats: PDF, JPG, PNG (Max 10MB)
                </p>
              </div>

              {uploadedFile && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-4">File Preview</h4>
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <div className="flex-1">
                      <p className="font-medium">{uploadedFile.name}</p>
                      <p className="text-sm text-gray-600">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      onClick={() => setCurrentScreen('data-extraction')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Next: Extract Data
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const DataExtractionPage = () => {
    const handleInputChange = (field: string, value: string) => {
      setExtractedData(prev => ({ ...prev, [field]: value }));
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setCurrentScreen('upload')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Upload
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TradeFlow</span>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Extraction</h1>
            <p className="text-gray-600">Review and edit the extracted invoice data</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Extracted Data Form */}
            <Card>
              <CardHeader>
                <CardTitle>Invoice Details</CardTitle>
                <CardDescription>Review and edit the extracted information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="product">Product *</Label>
                  <Input
                    id="product"
                    value={extractedData.product}
                    onChange={(e) => handleInputChange('product', e.target.value)}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="buyer">Buyer *</Label>
                  <Input
                    id="buyer"
                    value={extractedData.buyer}
                    onChange={(e) => handleInputChange('buyer', e.target.value)}
                    placeholder="Enter buyer name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={extractedData.quantity}
                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                    placeholder="Enter quantity"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="price">Price (USD) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={extractedData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="Enter price"
                    required
                  />
                </div>

                <Separator />

                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentScreen('upload')}
                    className="flex-1"
                  >
                    Back to Upload
                  </Button>
                  <Button
                    onClick={handleDataExtraction}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Generate Documents
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* File Preview */}
            <Card>
              <CardHeader>
                <CardTitle>File Preview</CardTitle>
                <CardDescription>Original uploaded file</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-8 text-center bg-gray-50">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="font-medium text-gray-900">
                    {uploadedFile?.name || currentInvoice?.fileName || 'No file selected'}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    PDF Document Preview
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  const DocumentGenerationPage = () => {
    const documents = [
      { name: 'Commercial Invoice', status: 'Generated', icon: FileText },
      { name: 'Customs Declaration', status: 'Generated', icon: FileCheck },
      { name: 'Certificate of Origin', status: 'Generated', icon: Package }
    ];

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setCurrentScreen('dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TradeFlow</span>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Generation</h1>
            <p className="text-gray-600">Your export documents have been successfully generated</p>
          </div>

          {/* Success Message */}
          <Card className="mb-8 border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-green-900">Documents Generated Successfully!</h3>
                  <p className="text-green-700">All export documents are ready for download</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Summary */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Invoice Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Product</p>
                  <p className="font-medium">{currentInvoice?.product || extractedData.product}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Buyer</p>
                  <p className="font-medium">{currentInvoice?.buyer || extractedData.buyer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Quantity</p>
                  <p className="font-medium">{currentInvoice?.quantity || extractedData.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Value</p>
                  <p className="font-medium">${currentInvoice?.price || extractedData.price}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generated Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Generated Documents</CardTitle>
              <CardDescription>Download your export documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <doc.icon className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <Badge variant="default" className="bg-green-600">
                          {doc.status}
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download All as ZIP
                </Button>
                <Button variant="outline" className="flex-1">
                  Email Documents
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentScreen('dashboard')}
                  className="flex-1"
                >
                  Return to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const DocumentHistoryPage = () => {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setCurrentScreen('dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TradeFlow</span>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Document History</h1>
            <p className="text-gray-600">View and manage all your processed invoices</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Invoices</CardTitle>
              <CardDescription>Complete history of your uploaded and processed invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Buyer</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.fileName}</TableCell>
                      <TableCell>{invoice.product}</TableCell>
                      <TableCell>{invoice.buyer}</TableCell>
                      <TableCell>{invoice.quantity}</TableCell>
                      <TableCell>${invoice.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={invoice.status === 'completed' ? 'default' : 
                                  invoice.status === 'processed' ? 'secondary' : 'outline'}
                        >
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{invoice.createdAt}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigateTo('data-extraction', invoice)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {invoice.status === 'processed' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => navigateTo('document-generation', invoice)}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const ProfileSettingsPage = () => {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setCurrentScreen('dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TradeFlow</span>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile & Settings</h1>
            <p className="text-gray-600">Manage your account settings and preferences</p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Update your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={user?.name || ''} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user?.email || ''} />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">Update Profile</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your account password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">Change Password</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
                <CardDescription>Manage your account</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  const PrivacyPolicyPage = () => {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setCurrentScreen('welcome')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TradeFlow</span>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: September 29, 2024</p>
          </div>

          <Card>
            <CardContent className="p-8 space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Information We Collect</h2>
                <p className="text-gray-600 mb-4">
                  TradeFlow collects information necessary to provide our export document generation services:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Account information (name, email, company details)</li>
                  <li>Invoice and document data uploaded to our platform</li>
                  <li>Usage data to improve our AI extraction capabilities</li>
                  <li>Technical data including IP addresses and browser information</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">How We Use Your Information</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Process invoices and generate export documents</li>
                  <li>Provide customer support and technical assistance</li>
                  <li>Improve our AI data extraction algorithms</li>
                  <li>Ensure compliance with international trade regulations</li>
                  <li>Send important service updates and notifications</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Data Security</h2>
                <p className="text-gray-600">
                  We implement enterprise-grade security measures to protect your sensitive business data. 
                  All documents are encrypted in transit and at rest. We comply with SOC 2 Type II standards 
                  and international data protection regulations including GDPR.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Data Retention</h2>
                <p className="text-gray-600">
                  We retain your documents and data as long as your account is active. Upon account deletion, 
                  all personal data and uploaded documents are permanently deleted within 30 days, except where 
                  required by law for regulatory compliance.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">International Transfers</h2>
                <p className="text-gray-600">
                  As a global trade platform, your data may be processed in different countries to optimize 
                  performance and comply with local trade regulations. We ensure adequate safeguards are in 
                  place for all international data transfers.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact Us</h2>
                <p className="text-gray-600">
                  For privacy-related questions or to exercise your data rights, contact our Data Protection 
                  Officer at privacy@tradeflow.com or use our contact form.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const TermsOfServicePage = () => {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setCurrentScreen('welcome')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TradeFlow</span>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
            <p className="text-gray-600">Last updated: September 29, 2024</p>
          </div>

          <Card>
            <CardContent className="p-8 space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Service Description</h2>
                <p className="text-gray-600">
                  TradeFlow is an automated export document generation platform that helps businesses create 
                  compliant international trade documents including invoices, customs declarations, and 
                  certificates of origin using AI-powered data extraction.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">User Responsibilities</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Provide accurate and complete information in all uploaded documents</li>
                  <li>Verify all extracted data before generating final documents</li>
                  <li>Comply with all applicable international trade laws and regulations</li>
                  <li>Maintain the confidentiality of your account credentials</li>
                  <li>Use the service only for legitimate business purposes</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Document Accuracy</h2>
                <p className="text-gray-600 mb-4">
                  While TradeFlow uses advanced AI to extract data, users are solely responsible for:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Reviewing and verifying all extracted data before document generation</li>
                  <li>Ensuring compliance with destination country import/export requirements</li>
                  <li>Obtaining necessary licenses and permits for international trade</li>
                  <li>Accuracy of final generated documents used in actual shipments</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Limitation of Liability</h2>
                <p className="text-gray-600">
                  TradeFlow provides document generation tools but is not responsible for customs delays, 
                  rejected shipments, or regulatory compliance issues. Users assume full responsibility 
                  for the accuracy and legal compliance of all generated documents.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Service Availability</h2>
                <p className="text-gray-600">
                  We strive for 99.9% uptime but cannot guarantee uninterrupted service. Scheduled 
                  maintenance will be communicated in advance. We are not liable for business losses 
                  due to service interruptions.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Intellectual Property</h2>
                <p className="text-gray-600">
                  You retain ownership of your uploaded documents and data. TradeFlow retains rights 
                  to our platform, AI algorithms, and generated document templates. You grant us a 
                  limited license to process your data to provide our services.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Termination</h2>
                <p className="text-gray-600">
                  Either party may terminate the service with 30 days notice. Upon termination, you 
                  have 30 days to download your data before permanent deletion. We may immediately 
                  terminate accounts that violate these terms or engage in fraudulent activity.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const ContactPage = () => {
    const [contactForm, setContactForm] = useState({
      name: '',
      email: '',
      company: '',
      subject: '',
      message: ''
    });

    const handleContactSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Handle contact form submission
      alert('Thank you for your message! We\'ll get back to you within 24 hours.');
      setContactForm({ name: '', email: '', company: '', subject: '', message: '' });
    };

    const handleContactChange = (field: string, value: string) => {
      setContactForm(prev => ({ ...prev, [field]: value }));
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setCurrentScreen('welcome')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TradeFlow</span>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-6">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
            <p className="text-gray-600">Get in touch with our team for support or inquiries</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-name">Name *</Label>
                      <Input
                        id="contact-name"
                        value={contactForm.name}
                        onChange={(e) => handleContactChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-email">Email *</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => handleContactChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="contact-company">Company</Label>
                    <Input
                      id="contact-company"
                      value={contactForm.company}
                      onChange={(e) => handleContactChange('company', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contact-subject">Subject *</Label>
                    <Input
                      id="contact-subject"
                      value={contactForm.subject}
                      onChange={(e) => handleContactChange('subject', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contact-message">Message *</Label>
                    <textarea
                      id="contact-message"
                      className="min-h-[120px] w-full rounded-md border border-input bg-input-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={contactForm.message}
                      onChange={(e) => handleContactChange('message', e.target.value)}
                      placeholder="Tell us how we can help you..."
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                  <CardDescription>
                    Multiple ways to reach our support team
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Sales & Partnerships</h4>
                      <p className="text-sm text-gray-600 mt-1">sales@tradeflow.com</p>
                      <p className="text-sm text-gray-600">For enterprise inquiries and partnerships</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mt-1">
                      <Settings className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Technical Support</h4>
                      <p className="text-sm text-gray-600 mt-1">support@tradeflow.com</p>
                      <p className="text-sm text-gray-600">For platform issues and integration help</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mt-1">
                      <FileText className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Legal & Compliance</h4>
                      <p className="text-sm text-gray-600 mt-1">legal@tradeflow.com</p>
                      <p className="text-sm text-gray-600">For compliance and regulatory questions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Business Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="text-gray-900">9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="text-gray-900">10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="text-gray-900">Closed</span>
                  </div>
                  <Separator className="my-3" />
                  <p className="text-sm text-gray-600">
                    For urgent technical issues outside business hours, 
                    contact support@tradeflow.com with "URGENT" in the subject line.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render current screen
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomePage />;
      case 'login':
        return <LoginSignupPage />;
      case 'dashboard':
        return <Dashboard />;
      case 'upload':
        return <UploadInvoicePage />;
      case 'data-extraction':
        return <DataExtractionPage />;
      case 'document-generation':
        return <DocumentGenerationPage />;
      case 'history':
        return <DocumentHistoryPage />;
      case 'profile':
        return <ProfileSettingsPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsOfServicePage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <WelcomePage />;
    }
  };

  return renderCurrentScreen();
}