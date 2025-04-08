import React from 'react';

const Item = ({ produto }) => {
  return (
    <>
      <span>
        {produtos.nome} - {produtos.preco} 
      </span>
    </>
  );
};

export default Item;