import React from 'react';
import '../../styles/components/_purchases.scss'
function PurchasesList() {

  return (
    <section className="purchasesList">
      <div className="purchasesList__container">
        <h2 className="purchasesList__title">My purchases</h2>
        <ul className="purchasesList__list">
          <div className="emptyLayout">
          </div>
        </ul>
      </div>
    </section>
  );
}

export default PurchasesList;





