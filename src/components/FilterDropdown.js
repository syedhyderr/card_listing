import React from 'react';
import './FilterDropdown.css';

const FilterDropdown = ({ onCardTypeFilter }) => {
  const handleFilterChange = (event) => {
    const selectedCardType = event.target.value;
    onCardTypeFilter(selectedCardType);
  };

  return (
    <div className="filter-dropdown">
      <label htmlFor="card-type-filter">Filter by Card Type:</label>
      <select id="card-type-filter" onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="burner">Burner</option>
        <option value="subscription">Subscription</option>
      </select>
    </div>
  );
};

export default FilterDropdown;
