import { useEffect, useState, useRef, useMemo, FormEvent } from 'react';
import axios from 'axios';

interface Block {
  id: string;
  title: string;
  description: string;
  classUrl: string;
  status: 'pending' | 'resolved';
  createdAt: string;
}

export function App() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [classUrl, setClassUrl] = useState('');
  const [formError, setFormError] = useState('');
  
  const titleInputRef = useRef<HTMLInputElement>(null);

  // GET: Buscar dados
  useEffect(() => {
    axios.get('http://localhost:3000/blocks')
      .then(response => setBlocks(response.data))
      .catch(error => console.error("Erro ao buscar dados:", error))
      .finally(() => setIsLoading(false));
  }, []);

  // POST: Criar dado
  function handleCreateBlock(e: FormEvent) {
    e.preventDefault();
    setFormError('');

    if (!title || !description) {
      setFormError('Por favor, preencha o título e a descrição.');
      return;
    }

    const newBlock = {
      title,
      description,
      classUrl,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    axios.post('http://localhost:3000/blocks', newBlock)
      .then(response => {
        setBlocks([...blocks, response.data]);
        setTitle('');
        setDescription('');
        setClassUrl('');
        titleInputRef.current?.focus();
      })
      .catch(() => setFormError('Ops! Algo deu errado ao salvar.'));
  }

  // PATCH: Atualizar status (Requisito 3.3)
  function handleResolveBlock(id: string) {
    // Atualiza apenas o status no back-end
    axios.patch(`http://localhost:3000/blocks/${id}`, { status: 'resolved' })
      .then(response => {
        // Atualiza o estado visual mapeando o array e substituindo apenas o item modificado
        setBlocks(blocks.map(block => block.id === id ? response.data : block));
      })
      .catch(error => console.error("Erro ao resolver bloqueio:", error));
  }

  // DELETE: Remover dado (Requisito 3.4)
  function handleDeleteBlock(id: string) {
    // Confirmação justificada: Evitar perda acidental de links importantes
    if (window.confirm("Tem certeza que deseja apagar este bloqueio?")) {
      axios.delete(`http://localhost:3000/blocks/${id}`)
        .then(() => {
          // Filtra o array removendo o item deletado
          setBlocks(blocks.filter(block => block.id !== id));
        })
        .catch(error => console.error("Erro ao deletar bloqueio:", error));
    }
  }

  // Hook Exigido: useMemo para ordenar a lista (Pendentes no topo)
  const sortedBlocks = useMemo(() => {
    return [...blocks].sort((a, b) => {
      if (a.status === 'pending' && b.status === 'resolved') return -1;
      if (a.status === 'resolved' && b.status === 'pending') return 1;
      return 0;
    });
  }, [blocks]); // Só recalcula se o array 'blocks' mudar

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600">DevBlock Tracker</h1>
        <p className="mt-2 text-gray-600">Acompanhe e resolva seus bloqueios de estudo</p>
      </header>

      <main className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        
        {/* Formulário */}
        <section className="mb-8 bg-gray-50 p-4 rounded-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Registrar Novo Bloqueio</h2>
          <form onSubmit={handleCreateBlock} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="title" className="text-sm font-medium text-gray-700 mb-1">Título do Erro/Dúvida</label>
              <input id="title" ref={titleInputRef} type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: Erro de CORS no Axios" className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Explique rapidamente o que aconteceu..." className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none h-20" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="url" className="text-sm font-medium text-gray-700 mb-1">Link da Aula/Documentação (Opcional)</label>
              <input id="url" type="url" value={classUrl} onChange={e => setClassUrl(e.target.value)} placeholder="https://..." className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            {formError && <span className="text-red-500 text-sm font-semibold">{formError}</span>}
            <button type="submit" className="bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors">Adicionar Bloqueio</button>
          </form>
        </section>

        {/* Lista */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-gray-800">Meus Bloqueios</h2>
          
          {isLoading ? (
            <p className="text-gray-500 text-center py-4">Carregando seus bloqueios...</p>
          ) : sortedBlocks.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Nenhum bloqueio registrado. Tudo fluindo! 🚀</p>
          ) : (
            <ul className="space-y-4">
              {/* Agora fazemos o map no sortedBlocks e não mais no blocks direto */}
              {sortedBlocks.map(block => (
                <li key={block.id} className={`p-4 border rounded-md flex flex-col gap-3 transition-all ${block.status === 'resolved' ? 'bg-gray-50 opacity-75' : 'bg-white'}`}>
                  
                  <div className="flex justify-between items-start">
                    <h3 className={`font-bold text-lg ${block.status === 'resolved' ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                      {block.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${block.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {block.status === 'resolved' ? 'Resolvido' : 'Pendente'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600">{block.description}</p>
                  
                  {block.classUrl && (
                    <a href={block.classUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-sm font-medium">
                      Ver Aula / Documentação
                    </a>
                  )}

                  {/* Novos Botões de Ação */}
                  <div className="flex gap-2 mt-2 pt-2 border-t border-gray-100">
                    {block.status === 'pending' && (
                      <button 
                        onClick={() => handleResolveBlock(block.id)}
                        className="text-sm bg-green-50 text-green-600 px-3 py-1 rounded hover:bg-green-100 font-medium transition-colors"
                        aria-label="Marcar como resolvido"
                      >
                        ✓ Resolver
                      </button>
                    )}
                    <button 
                      onClick={() => handleDeleteBlock(block.id)}
                      className="text-sm bg-red-50 text-red-600 px-3 py-1 rounded hover:bg-red-100 font-medium transition-colors"
                      aria-label="Excluir bloqueio"
                    >
                      🗑️ Excluir
                    </button>
                  </div>

                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;