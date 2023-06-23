import React, { useEffect, useState } from 'react';
import Card from './Card';
import FilterDropdown from './FilterDropdown';
import './CardListingPage.css';

const CardListingPage = () => {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [cardTypeFilter, setCardTypeFilter] = useState('');

  useEffect(() => {
    // Fetch data from API based on page, search query, and card type filter
    fetchCards();
  }, [page, searchQuery, cardTypeFilter]);

  const fetchCards = () => {
    const API_URL = 'https://mocki.io/v1/817887a7-6fde-4d35-bf53-1f709a3b9276'; // Replace with your actual API URL
  
    // Set up the query parameters for pagination, search query, and card type filter
    const queryParams = {
      page,
      per_page: 10,
      search: searchQuery,
      card_type: cardTypeFilter,
    };
  
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${API_URL}?${queryString}`;
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const fetchedCards = data.data;
        setCards((prevCards) => [...prevCards, ...fetchedCards]);
      })
      .catch((error) => {
        console.error('Error fetching cards:', error);
      });
  };
  

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCardTypeFilter = (selectedCardType) => {
    setCardTypeFilter(selectedCardType);
  };

  const filteredCards = cards.filter((card) => {
    // Apply search query and card type filter to the cards
    const matchesSearchQuery =
      card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.budget_name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCardType = cardTypeFilter === '' || card.card_type === cardTypeFilter;

    return matchesSearchQuery && matchesCardType;
  });

  return (
    <div className="card-listing-page">
      <div className="filters">
        <input type="text" placeholder="Search by card name" onChange={handleSearch} />
        <FilterDropdown onCardTypeFilter={handleCardTypeFilter} />
      </div>
      <div className="card-list">
        {filteredCards.map((card) => (
          <Card key={card.name} card={card} />
        ))}
        <button onClick={handleLoadMore}>Load More</button>
      </div>
    </div>
  );
};

export default CardListingPage;
