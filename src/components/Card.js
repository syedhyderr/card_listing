import React from 'react';
import './Card.css';

const Card = ({ card }) => {
  const renderCardTypeIcon = () => {
    if (card.card_type === 'burner') {
      return <span className="card-type-icon">B</span>;
    } else if (card.card_type === 'subscription') {
      return <span className="card-type-icon">S</span>;
    }
    return null;
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-type">{renderCardTypeIcon()}</div>
        <div className="card-name">{card.name}</div>
      </div>
      <div className="card-details">
        {card.card_type === 'burner' ? (
          <div className="expiry">Expiry: {card.expiry}</div>
        ) : (
          <div className="limit">Limit: {card.limit}</div>
        )}
        <div className="budget-name">{card.budget_name}</div>
        <div className="status">Status: {card.status}</div>
      </div>
    </div>
  );
};

export default Card;
