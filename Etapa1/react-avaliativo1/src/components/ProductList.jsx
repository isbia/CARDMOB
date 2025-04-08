import React from 'react';
import Item from './ProductCard';

const ProductList = ({ name }) => {
    const [produtos, setProdutos] = useState([]); // Array de contatos
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingNome, setEditingNome] = useState("");
    const [editingPreco, setEditingpreco] = useState("");
  
    // Create
    const addProduto = () => {
      if (nome.trim() === "" || preco.trim() === "") return;
      setProdutos([...produtos, { id: Date.now(), nome, preco }]);
      setNome("");
      setPreco("");
    };
  
    // Start editing
    const startEditing = (id, produtos) => {
      setEditingId(id);
      setEditingNome(produtos.nome);
      setEditingPreco(produtos.email);
    };
  
    // Save edit
    const saveEdit = () => {
      setProdutos(
        produtos.map(
            produtos.map((produto) =>
            produtos.id === editingId
        ? { ...contato, nome: editingNome, preco: editingPreco }
    : produto
        )
        )
      );
      setEditingId(null);
      setEditingNome("");
      setEditingPreco("");
    };
  
    // Cancel editing
    const cancelEdit = () => {
      setEditingId(null);
      setEditingNome("");
      setEditingPreco("");
    };
  
    // Delete
    const deleteProduto = (id) => {
      setProdutos(produtos.filter((produtos) => produtos.id !== id));
    };
  
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Lista de Produtos {name}</h2>
  
        <input
          type="text"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          placeholder="Nome do Produto"
        />
        <input
          type="text"
          value={preco}
          onChange={(event) => setPreco(event.target.value)}
          placeholder="Preço do Produto"
        />
        <button onClick={addProduto}>Adicionar no Carrinho</button>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {produtos.map((produtos) => (
            <li key={produtos.id} style={{ margin: "10px 0" }}>
              {editingId === produtos.id ? (
                <>
                  <input
                    type="text"
                    value={editingNome}
                    onChange={(event) => setEditingNome(event.target.value)}
                    placeholder="Editar Nome"
                  />
                  <input
                    type="text"
                    value={editingPreco}
                    onChange={(event) => setEditingPreco(event.target.value)}
                    placeholder="Editar Preco"
                  />
                  <button onClick={saveEdit}>Salvar</button>
                  <button onClick={cancelEdit}>Cancelar</button>
                </>
              ) : (
                <>
                  <Item produto={produto} /> {/* Passa o objeto contato como prop */}
                  <button onClick={() => startEditing(produto.id, produtos)}>
                    Editar
                  </button>
                  <button onClick={() => deleteProduto(produto.id)}>Excluir</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ProductList;