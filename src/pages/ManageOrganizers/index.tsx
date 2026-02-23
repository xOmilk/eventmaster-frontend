import { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Eye, Mail, Phone, FileText, Building2 } from 'lucide-react';
import { Header } from '../../components/Header';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../components/ui/dialog';
import { toast } from 'sonner';

// --- interfaces
interface SolicitacaoOrganizador {
  id: string;
  nomeOrganizacao: string;
  email: string;
  telefone: string;
  cnpj: string;
  descricao: string;
  site: string;
  endereco: string;
  dataSolicitacao: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
}

interface Organizador {
  id: string;
  nomeOrganizacao: string;
  email: string;
  telefone: string;
  cnpj: string;
  dataAprovacao: string;
  totalEventos: number;
  receitaTotal: number;
  status: 'ativo' | 'suspenso';
}

// --- mocks
const SOLICITACOES_MOCK: SolicitacaoOrganizador[] = [
  {
    id: '1',
    nomeOrganizacao: 'Produtora ABC Eventos',
    email: 'contato@abceventos.com.br',
    telefone: '(11) 98888-8888',
    cnpj: '12.345.678/0001-90',
    descricao: 'Produtora especializada em eventos corporativos e festivais de música eletrônica com mais de 10 anos de experiência no mercado.',
    site: 'https://www.abceventos.com.br',
    endereco: 'Av. Paulista, 1000 - São Paulo, SP',
    dataSolicitacao: '2025-11-20',
    status: 'pendente'
  },
  {
    id: '2',
    nomeOrganizacao: 'Teatro Nacional',
    email: 'admin@teatronacional.com',
    telefone: '(21) 97777-7777',
    cnpj: '98.765.432/0001-10',
    descricao: 'Teatro com 50 anos de história, focado em espetáculos culturais e peças clássicas.',
    site: 'https://www.teatronacional.com',
    endereco: 'Centro - Rio de Janeiro, RJ',
    dataSolicitacao: '2025-11-18',
    status: 'pendente'
  }
];

const ORGANIZADORES_MOCK: Organizador[] = [
  {
    id: '1',
    nomeOrganizacao: 'Live Nation Brasil',
    email: 'contato@livenation.com.br',
    telefone: '(11) 99999-9999',
    cnpj: '11.111.111/0001-11',
    dataAprovacao: '2025-01-15',
    totalEventos: 45,
    receitaTotal: 1250000,
    status: 'ativo'
  },
  {
    id: '2',
    nomeOrganizacao: 'Rock World',
    email: 'info@rockworld.com.br',
    telefone: '(11) 98888-8888',
    cnpj: '22.222.222/0001-22',
    dataAprovacao: '2025-03-10',
    totalEventos: 28,
    receitaTotal: 850000,
    status: 'ativo'
  }
];

export function ManageOrganizers({ onBack }: { onBack: () => void }) {
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoOrganizador[]>(SOLICITACOES_MOCK);
  const [organizadores, setOrganizadores] = useState<Organizador[]>(ORGANIZADORES_MOCK);
  const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState<SolicitacaoOrganizador | null>(null);
  const [abaAtual, setAbaAtual] = useState('pendentes');

  // --- funções de manipulação
  const aoAprovar = (id: string) => {
    const item = solicitacoes.find(s => s.id === id);
    if (!item) return;

    const novoOrg: Organizador = {
      id: crypto.randomUUID(),
      nomeOrganizacao: item.nomeOrganizacao,
      email: item.email,
      telefone: item.telefone,
      cnpj: item.cnpj,
      dataAprovacao: new Date().toISOString().split('T')[0],
      totalEventos: 0,
      receitaTotal: 0,
      status: 'ativo'
    };

    setSolicitacoes(prev => prev.map(s => s.id === id ? { ...s, status: 'aprovado' } : s));
    setOrganizadores(prev => [novoOrg, ...prev]);
    setSolicitacaoSelecionada(null);
    toast.success(`${item.nomeOrganizacao} foi aprovado!`);
  };

  const aoRejeitar = (id: string) => {
    const item = solicitacoes.find(s => s.id === id);
    if (!item) return;
    setSolicitacoes(prev => prev.map(s => s.id === id ? { ...s, status: 'rejeitado' } : s));
    setSolicitacaoSelecionada(null);
    toast.info(`Solicitação de ${item.nomeOrganizacao} rejeitada.`);
  };

  const aoSuspender = (id: string) => {
    if (confirm('Deseja suspender este organizador?')) {
      setOrganizadores(prev => prev.map(o => o.id === id ? { ...o, status: 'suspenso' } : o));
      toast.info('Organizador suspenso.');
    }
  };

  const aoAtivar = (id: string) => {
    setOrganizadores(prev => prev.map(o => o.id === id ? { ...o, status: 'ativo' } : o));
    toast.success('Organizador reativado.');
  };

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 scale-[1.4] origin-top">
        {/* Cabeçalho */}
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="size-4 mr-2" />
            Voltar ao Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gerenciar Organizadores</h1>
          <p className="text-gray-600">Aprovar solicitações e gerenciar organizadores ativos</p>
        </div>

        <Tabs value={abaAtual} onValueChange={setAbaAtual}>
          <TabsList className="mb-6">
            <TabsTrigger value="pendentes">Solicitações ({solicitacoes.filter(s => s.status === 'pendente').length})</TabsTrigger>
            <TabsTrigger value="ativos">Organizadores Ativos ({organizadores.filter(o => o.status === 'ativo').length})</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
          </TabsList>

          {/* --- ABA: PENDENTES --- */}
          <TabsContent value="pendentes">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {solicitacoes.filter(s => s.status === 'pendente').map((solicitacao) => (
                <Card key={solicitacao.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Building2 className="size-5 text-blue-600" />
                          {solicitacao.nomeOrganizacao}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          Solicitado em {new Date(solicitacao.dataSolicitacao).toLocaleDateString('pt-BR')}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">Pendente</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2"><Mail className="size-4" /> {solicitacao.email}</div>
                      <div className="flex items-center gap-2"><Phone className="size-4" /> {solicitacao.telefone}</div>
                      <div className="flex items-center gap-2"><FileText className="size-4" /> CNPJ: {solicitacao.cnpj}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => setSolicitacaoSelecionada(solicitacao)}>
                        <Eye className="size-4 mr-2" /> Ver Detalhes
                      </Button>
                      <Button variant="default" size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white" onClick={() => aoAprovar(solicitacao.id)}>
                        <CheckCircle className="size-4 mr-2" /> Aprovar
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => aoRejeitar(solicitacao.id)}>
                        <XCircle className="size-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* --- ABA: ATIVOS --- */}
          <TabsContent value="ativos">
            <Card className="border-none shadow-md">
              <CardContent className="p-0">
                <div className="overflow-x-auto rounded-lg">
                  <table className="w-full border-collapse">
                    <thead className="bg-gray-100/50 border-b border-gray-200">
                      <tr className="text-sm text-gray-600 uppercase tracking-wider">
                        <th className="px-8 py-5 text-left font-semibold">Organização</th>
                        <th className="px-8 py-5 text-left font-semibold">Contato</th>
                        <th className="px-8 py-5 text-left font-semibold">Dados de Operação</th>
                        <th className="px-8 py-5 text-left font-semibold">Status</th>
                        <th className="px-8 py-5 text-right font-semibold">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      {organizadores.map((org) => (
                        <tr
                          key={org.id}
                          className={`transition-colors ${
                            org.status === 'suspenso' ? 'bg-red-50/30' : 'hover:bg-blue-50/20'
                          }`}
                        >
                          {/* Organização */}
                          <td className="px-8 py-6">
                            <div className="flex flex-col gap-1">
                              <span className="text-lg font-bold text-gray-900 leading-tight">
                                {org.nomeOrganizacao}
                              </span>
                              <span className="inline-flex items-center text-sm text-gray-500 bg-gray-100 w-fit px-2 py-0.5 rounded">
                                <FileText className="size-3 mr-1" /> {org.cnpj}
                              </span>
                            </div>
                          </td>

                          {/* Contato */}
                          <td className="px-8 py-6">
                            <div className="flex flex-col gap-1 text-gray-700">
                              <div className="flex items-center gap-2">
                                <Mail className="size-4 text-gray-400" />
                                <span className="text-base">{org.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="size-4 text-gray-400" />
                                <span className="text-sm text-gray-500">{org.telefone}</span>
                              </div>
                            </div>
                          </td>

                          {/* Dados de Operação (Eventos + Receita) */}
                          <td className="px-8 py-6">
                            <div className="flex flex-col gap-1">
                              <div className="text-sm text-gray-500">
                                Aprovado em: <span className="text-gray-900 font-medium">{new Date(org.dataAprovacao).toLocaleDateString('pt-BR')}</span>
                              </div>
                              <div className="flex gap-4 mt-1">
                                <div className="flex flex-col">
                                  <span className="text-[10px] uppercase text-gray-400 font-bold tracking-tighter">Eventos</span>
                                  <span className="text-blue-600 font-bold">{org.totalEventos}</span>
                                </div>
                                <div className="flex flex-col border-l pl-4">
                                  <span className="text-[10px] uppercase text-gray-400 font-bold tracking-tighter">Receita</span>
                                  <span className="text-green-600 font-bold">R$ {org.receitaTotal.toLocaleString('pt-BR')}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-8 py-6">
                            <Badge
                              className={`px-3 py-1 text-xs font-bold uppercase ${
                                org.status === 'ativo'
                                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100'
                                  : 'bg-rose-100 text-rose-700 hover:bg-rose-100'
                              }`}
                            >
                              {org.status === 'ativo' ? 'Ativo' : 'Suspenso'}
                            </Badge>
                          </td>

                          {/* Ações */}
                          <td className="px-8 py-6 text-right">
                            <Button
                              variant={org.status === 'ativo' ? 'outline' : 'default'}
                              size="sm"
                              className={`font-semibold transition-all ${
                                org.status === 'ativo'
                                  ? 'border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300'
                                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                              }`}
                              onClick={() => org.status === 'ativo' ? aoSuspender(org.id) : aoAtivar(org.id)}
                            >
                              {org.status === 'ativo' ? 'Suspender Conta' : 'Reativar Conta'}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- ABA: HISTÓRICO --- */}
          <TabsContent value="historico">
            <div className="space-y-4">
              {solicitacoes.filter(s => s.status !== 'pendente').map((s) => (
                <Card key={s.id}>
                  <CardHeader className="py-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-semibold">{s.nomeOrganizacao}</CardTitle>
                      <Badge variant={s.status === 'aprovado' ? 'default' : 'destructive'}>
                        {s.status === 'aprovado' ? 'Aprovado' : 'Rejeitado'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                    <div><span className="font-bold">Email:</span> {s.email}</div>
                    <div><span className="font-bold">Telefone:</span> {s.telefone}</div>
                    <div><span className="font-bold">CNPJ:</span> {s.cnpj}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

          {/* --- DETALHES --- */}
            {solicitacaoSelecionada && (
              <Dialog open={!!solicitacaoSelecionada} onOpenChange={() => setSolicitacaoSelecionada(null)}>
                {/* CORREÇÃO AQUI:
                    1. Usamos sm:max-w-[900px] para definir uma largura fixa de ~1.5x a original.
                    2. Mantivemos as classes padrões do componente para garantir a centralização.
                    3. Aumentamos o padding para p-10 para dar respiro.
                */}
                <DialogContent className="sm:max-w-[450px] p-10 bg-white gap-8">
                  <DialogHeader className="space-y-4">
                    {/* Títulos aumentados proporcionalmente */}
                    <DialogTitle className="text-3xl font-bold tracking-tight">Detalhes da Solicitação</DialogTitle>
                    <DialogDescription className="text-xl text-gray-500">Informações completas da organização</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-10 mt-4">
                    {/* Grid com texto base aumentado para text-lg (18px) e gaps maiores */}
                    <div className="grid grid-cols-2 gap-x-12 gap-y-8 text-xl">
                      {/* Nome da organização bem grande */}
                      <div className="col-span-2 font-bold text-4xl text-blue-700 leading-tight mb-2">
                        {solicitacaoSelecionada.nomeOrganizacao}
                      </div>

                      {/* Blocos de informação: Labels em uppercase para contraste, dados maiores */}
                      <div className="space-y-2">
                        <label className="text-gray-500 block font-bold text-sm uppercase tracking-wider">Email</label>
                        <div className="font-medium text-gray-900">{solicitacaoSelecionada.email}</div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-gray-500 block font-bold text-sm uppercase tracking-wider">Telefone</label>
                        <div className="font-medium text-gray-900">{solicitacaoSelecionada.telefone}</div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-gray-500 block font-bold text-sm uppercase tracking-wider">CNPJ</label>
                        <div className="font-medium text-gray-900">{solicitacaoSelecionada.cnpj}</div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-gray-500 block font-bold text-sm uppercase tracking-wider">Data do Pedido</label>
                        <div className="font-medium text-gray-900">
                          {new Date(solicitacaoSelecionada.dataSolicitacao).toLocaleDateString('pt-BR')}
                        </div>
                      </div>

                      {solicitacaoSelecionada.site && (
                        <div className="col-span-2 space-y-2">
                          <label className="text-gray-500 block font-bold text-sm uppercase tracking-wider">Site</label>
                          <a href={solicitacaoSelecionada.site} className="text-blue-600 underline font-medium text-xl" target="_blank" rel="noreferrer">
                            {solicitacaoSelecionada.site}
                          </a>
                        </div>
                      )}

                      {solicitacaoSelecionada.endereco && (
                        <div className="col-span-2 space-y-2">
                          <label className="text-gray-500 block font-bold text-sm uppercase tracking-wider">Endereço</label>
                          <div className="font-medium text-gray-900 leading-snug">{solicitacaoSelecionada.endereco}</div>
                        </div>
                      )}

                      <div className="col-span-2 space-y-3">
                        <label className="text-gray-500 block font-bold text-sm uppercase tracking-wider">Descrição</label>
                        <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                          <p className="text-gray-700 leading-relaxed italic text-xl">
                            {solicitacaoSelecionada.descricao}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Botões grandes (h-auto, py-6, text-lg) */}
                    <div className="flex gap-5 justify-end pt-10 border-t border-gray-100">
                      <Button
                        variant="outline"
                        className="h-auto py-6 px-10 text-lg font-medium border-2"
                        onClick={() => setSolicitacaoSelecionada(null)}
                      >
                        Fechar
                      </Button>
                      <Button
                        variant="destructive"
                        className="h-auto py-6 px-10 text-lg font-bold"
                        onClick={() => aoRejeitar(solicitacaoSelecionada.id)}
                      >
                        Rejeitar
                      </Button>
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white h-auto py-6 px-12 text-lg font-bold shadow-md"
                        onClick={() => aoAprovar(solicitacaoSelecionada.id)}
                      >
                        Aprovar Agora
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
      </div>
    </>
  );
}