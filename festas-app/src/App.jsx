import { useState } from 'react';

// --- MOCK DE DADOS COM LINKS TESTADOS E ESTÁVEIS ---
const mockProdutos = [
  { id: 1, tipo: 'produto', categoria: 'Combos', nome: 'Combo Vodka + Energético', preco: '150,00', fornecedor: 'Adega Z', contato: '(92) 99999-9999', esgotado: false, imagem: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&auto=format&fit=crop&q=80' },
  { id: 2, tipo: 'produto', categoria: 'Essências', nome: 'Essência Menta 50g', preco: '35,00', fornecedor: 'Tabacaria X', contato: '(92) 98888-8888', esgotado: true, imagem: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=600&auto=format&fit=crop&q=80' },
  { id: 3, tipo: 'produto', categoria: 'Bebidas', nome: 'Cerveja Lata (Pack 12)', preco: '45,00', fornecedor: 'Distribuidora Y', contato: '(92) 97777-7777', esgotado: false, imagem: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&auto=format&fit=crop&q=80' },
  { id: 6, tipo: 'produto', categoria: 'Bebidas', nome: 'Garrafa Gin Tanqueray', preco: '120,00', fornecedor: 'Adega Z', contato: '(92) 99999-9999', esgotado: false, imagem: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80' },
  { id: 7, tipo: 'produto', categoria: 'Essências', nome: 'Essência Love 66', preco: '40,00', fornecedor: 'Tabacaria X', contato: '(92) 98888-8888', esgotado: false, imagem: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80' },
  { id: 8, tipo: 'produto', categoria: 'Acessórios', nome: 'Carvão de Coco 1kg', preco: '25,00', fornecedor: 'Tabacaria X', contato: '(92) 98888-8888', esgotado: false, imagem: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80' },
  { id: 9, tipo: 'produto', categoria: 'Combos', nome: 'Combo Whisky + Gelo Coco', preco: '200,00', fornecedor: 'Distribuidora Y', contato: '(92) 97777-7777', esgotado: false, imagem: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=600&auto=format&fit=crop&q=80' },
];

const mockServicos = [
  { id: 4, tipo: 'servico', categoria: 'Música', nome: 'DJ Eletrônica (4h)', preco: '500,00', fornecedor: 'DJ Cleiton', contato: '(92) 91111-1111', esgotado: false, imagem: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80' },
  { id: 5, tipo: 'servico', categoria: 'Bar', nome: 'Bartender c/ Bar Móvel', preco: '800,00', fornecedor: 'Drinks&Co', contato: '(92) 92222-2222', esgotado: false, imagem: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?w=600&auto=format&fit=crop&q=80' },
  { id: 10, tipo: 'servico', categoria: 'Música', nome: 'Banda Sertaneja (3h)', preco: '1200,00', fornecedor: 'Os Parças', contato: '(92) 93333-3333', esgotado: false, imagem: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80' },
  { id: 11, tipo: 'servico', categoria: 'Segurança', nome: 'Equipe de Segurança (4 p/)', preco: '600,00', fornecedor: 'SafeNight', contato: '(92) 94444-4444', esgotado: false, imagem: 'https://images.unsplash.com/photo-1582103287241-2762adba6c36?w=600&auto=format&fit=crop&q=80' },
  { id: 12, tipo: 'servico', categoria: 'Estrutura', nome: 'Iluminação + Máquina Fumaça', preco: '350,00', fornecedor: 'Luz & Cia', contato: '(92) 95555-5555', esgotado: false, imagem: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80' },
];


export default function App() {
  const [abaAtiva, setAbaAtiva] = useState('produtos');
  const [itemSelecionado, setItemSelecionado] = useState(null);

  const [filtroProduto, setFiltroProduto] = useState('Todos');
  const [filtroServico, setFiltroServico] = useState('Todos');

  // Estados de Autenticação
  const [isAutenticado, setIsAutenticado] = useState(false);
  const [modoAuth, setModoAuth] = useState('login'); 

  const categoriasProdutos = ['Todos', ...new Set(mockProdutos.map(p => p.categoria))];
  const categoriasServicos = ['Todos', ...new Set(mockServicos.map(s => s.categoria))];

  const produtosFiltrados = filtroProduto === 'Todos' ? mockProdutos : mockProdutos.filter(p => p.categoria === filtroProduto);
  const servicosFiltrados = filtroServico === 'Todos' ? mockServicos : mockServicos.filter(s => s.categoria === filtroServico);

  const renderFiltros = (categorias, filtroAtivo, setFiltro) => (
    <div className="flex flex-wrap gap-3 mb-8 px-2">
      {categorias.map(cat => (
        <button
          key={cat}
          onClick={() => setFiltro(cat)}
          className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
            filtroAtivo === cat
              ? 'bg-purple-600/20 text-purple-400 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
              : 'bg-gray-900 text-gray-400 border-gray-800 hover:border-gray-600 hover:text-gray-200'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );

  const renderCards = (itens) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-2">
      {itens.map((item) => (
        <div 
          key={item.id} 
          onClick={() => setItemSelecionado(item)}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 cursor-pointer transition-all duration-300 border border-gray-700 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] relative group flex flex-col"
        >
          {/* ESTRUTURA DE IMAGEM ATUALIZADA */}
          <div className="h-48 rounded-lg w-full mb-5 relative overflow-hidden border border-gray-800 group-hover:border-purple-500/50 transition-colors">
            <img 
              src={item.imagem} 
              alt={item.nome} 
              onError={(e) => {
           // Se a imagem falhar por qualquer motivo, carrega uma foto coringa de festa no lugar
              e.target.src = 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&auto=format&fit=crop&q=80';
             }}
             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"

              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Degradê escuro sobre a imagem para não perder o contraste */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80"></div>
            
            {/* Categoria posicionada sobre a imagem */}
            <span className="absolute bottom-3 left-3 text-xs tracking-widest uppercase text-gray-300 font-bold px-2 py-1 bg-black/50 backdrop-blur-md rounded">
              {item.categoria}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-50 tracking-wide flex-1">{item.nome}</h3>
          <p className="text-purple-400 font-black mt-3 text-lg">R$ {item.preco}</p>
          
          {item.esgotado && (
            <span className="absolute top-3 right-3 bg-red-600/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg z-10">
              Esgotado
            </span>
          )}
        </div>
      ))}
      
      {itens.length === 0 && (
        <div className="col-span-full py-12 text-center text-gray-500 font-medium border border-dashed border-gray-700 rounded-xl">
          Nenhum item encontrado nesta categoria.
        </div>
      )}
    </div>
  );

  const handleAuth = (e) => {
    e.preventDefault();
    setIsAutenticado(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200 font-sans selection:bg-purple-500/30 pb-16">
      
      <header className="bg-gray-950/80 backdrop-blur-lg p-5 border-b border-purple-500/20 sticky top-0 z-40 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <h1 className="text-3xl font-black tracking-tighter">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">NIGHT</span>
          <span className="text-white">FEST</span>
        </h1>
        <nav className="flex gap-2 sm:gap-3 bg-gray-900/50 p-1.5 rounded-lg border border-gray-800">
          <button 
            onClick={() => { setAbaAtiva('produtos'); setFiltroProduto('Todos'); }}
            className={`px-4 sm:px-6 py-2 rounded-md font-semibold transition-all duration-300 ${abaAtiva === 'produtos' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' : 'hover:text-white text-gray-400 hover:bg-gray-800'}`}
          >
            Produtos
          </button>
          <button 
            onClick={() => { setAbaAtiva('servicos'); setFiltroServico('Todos'); }}
            className={`px-4 sm:px-6 py-2 rounded-md font-semibold transition-all duration-300 ${abaAtiva === 'servicos' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' : 'hover:text-white text-gray-400 hover:bg-gray-800'}`}
          >
            Serviços
          </button>
          <button 
            onClick={() => setAbaAtiva('admin')}
            className={`px-4 sm:px-6 py-2 rounded-md font-semibold transition-all duration-300 ${abaAtiva === 'admin' ? 'bg-gray-100 text-gray-900 shadow-lg' : 'hover:text-white text-gray-400 hover:bg-gray-800'}`}
          >
            Gestão
          </button>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto mt-10 px-4">
        
        {abaAtiva === 'produtos' && (
          <div className="animate-[fadeIn_0.4s_ease-out]">
            <h2 className="text-3xl font-black px-2 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white w-fit">Catálogo Exclusivo</h2>
            {renderFiltros(categoriasProdutos, filtroProduto, setFiltroProduto)}
            {renderCards(produtosFiltrados)}
          </div>
        )}

        {abaAtiva === 'servicos' && (
          <div className="animate-[fadeIn_0.4s_ease-out]">
            <h2 className="text-3xl font-black px-2 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white w-fit">Serviços Premium</h2>
            {renderFiltros(categoriasServicos, filtroServico, setFiltroServico)}
            {renderCards(servicosFiltrados)}
          </div>
        )}

        {abaAtiva === 'admin' && (
          <div className="animate-[fadeIn_0.4s_ease-out]">
            
            {!isAutenticado ? (
              <div className="max-w-md mx-auto mt-12 bg-gray-900/80 p-8 rounded-2xl border border-gray-800 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600"></div>
                <h3 className="text-2xl font-black mb-6 text-white text-center">
                  {modoAuth === 'login' ? 'Acesso Restrito' : 'Criar Conta de Fornecedor'}
                </h3>
                
                <form className="space-y-4" onSubmit={handleAuth}>
                  {modoAuth === 'cadastro' && (
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-gray-400">Nome Completo / Empresa</label>
                      <input type="text" required className="w-full bg-gray-950 border border-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 p-3 rounded-lg text-white outline-none transition-all" />
                    </div>
                  )}
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-400">E-mail</label>
                    <input type="email" required className="w-full bg-gray-950 border border-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 p-3 rounded-lg text-white outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-400">Senha</label>
                    <input type="password" required className="w-full bg-gray-950 border border-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 p-3 rounded-lg text-white outline-none transition-all" />
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3.5 rounded-lg transition-all shadow-lg hover:shadow-purple-500/25 mt-6">
                    {modoAuth === 'login' ? 'Entrar no Sistema' : 'Registar'}
                  </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-400">
                  {modoAuth === 'login' ? 'Não tem conta? ' : 'Já tem conta? '}
                  <button 
                    onClick={() => setModoAuth(modoAuth === 'login' ? 'cadastro' : 'login')} 
                    className="text-purple-400 font-bold hover:text-purple-300 transition-colors"
                  >
                    {modoAuth === 'login' ? 'Cadastre-se' : 'Faça login'}
                  </button>
                </p>
              </div>
            ) : (
              
              <div className="max-w-3xl mx-auto mt-8 relative">
                <div className="flex justify-between items-center mb-6 px-2">
                  <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white">Painel de Gestão</h2>
                  <button 
                    onClick={() => setIsAutenticado(false)} 
                    className="text-sm font-bold text-red-400 hover:text-red-300 transition-colors border border-red-500/30 px-4 py-2 rounded-lg hover:bg-red-500/10"
                  >
                    Sair (Logout)
                  </button>
                </div>

                <div className="bg-gray-900/80 p-8 rounded-2xl border border-gray-800 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600"></div>
                  <h3 className="text-xl font-bold mb-8 text-white">Cadastrar Novo Item</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-400">Nome do Item</label>
                      <input type="text" className="w-full bg-gray-950 border border-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 p-3.5 rounded-lg text-white outline-none transition-all" />
                    </div>
                    <div className="space-y-2 md:col-span-1">
                      <label className="text-sm font-semibold text-gray-400">Categoria</label>
                      <select className="w-full bg-gray-950 border border-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 p-3.5 rounded-lg text-white outline-none transition-all appearance-none cursor-pointer">
                        <option value="">Selecione uma categoria...</option>
                        <option value="bebidas">Bebidas</option>
                        <option value="essencias">Essências</option>
                        <option value="musica">Música (Serviço)</option>
                        <option value="estrutura">Estrutura (Serviço)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-400">Preço (R$)</label>
                      <input type="text" className="w-full bg-gray-950 border border-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 p-3.5 rounded-lg text-white outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-400">Fornecedor</label>
                      <input type="text" className="w-full bg-gray-950 border border-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 p-3.5 rounded-lg text-white outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-400">Contacto</label>
                      <input type="text" className="w-full bg-gray-950 border border-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 p-3.5 rounded-lg text-white outline-none transition-all" />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-semibold text-gray-400">Imagem do Item</label>
                      <input 
                        type="file" 
                        accept="image/*"
                        className="w-full bg-gray-950 border border-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 p-2 rounded-lg text-gray-400 outline-none transition-all cursor-pointer file:cursor-pointer file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-purple-600/20 file:text-purple-400 hover:file:bg-purple-600/30 file:transition-colors" 
                      />
                    </div>
                  </div>
                  
                  <label className="mt-8 flex items-center gap-3 cursor-pointer group w-fit">
                    <div className="relative">
                      <input type="checkbox" className="peer sr-only" />
                      <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 transition-colors"></div>
                    </div>
                    <span className="font-medium text-gray-400 group-hover:text-white transition-colors">Marcar como Esgotado</span>
                  </label>

                  <button className="mt-10 w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg hover:shadow-purple-500/25">
                    Registar no Sistema
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* MODAL DE DETALHES - AGORA COM A IMAGEM NO TOPO */}
      {itemSelecionado && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-gray-900 p-8 rounded-2xl max-w-sm w-full border border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.15)] relative overflow-hidden">
            
            {/* Imagem do item no modal */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gray-800 z-0">
               <img src={itemSelecionado.imagem} alt={itemSelecionado.nome} className="w-full h-full object-cover opacity-40" />
               <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
            </div>

            <div className="relative z-10 pt-16">
              <span className="block text-center text-purple-400 text-xs font-bold uppercase tracking-widest mb-2">{itemSelecionado.categoria}</span>
              <h3 className="text-2xl font-black mb-1 text-center text-white">{itemSelecionado.nome}</h3>
              <p className="text-gray-300 font-bold text-xl mb-8 text-center">R$ {itemSelecionado.preco}</p>
              
              <div className="bg-gray-950 p-5 rounded-xl border border-gray-800 mb-8">
                <p className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-1">Fornecedor Oficial</p>
                <p className="font-black text-xl text-gray-100 mb-4">{itemSelecionado.fornecedor}</p>
                
                <p className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-1">Contacto Direto</p>
                <p className="font-black text-blue-400 text-xl">{itemSelecionado.contato}</p>
              </div>

              <button 
                onClick={() => setItemSelecionado(null)}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3.5 rounded-lg transition-colors border border-gray-700"
              >
                Fechar Detalhes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}