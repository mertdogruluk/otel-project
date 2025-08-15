'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  image: string;
  items: number;
  couponCode: string;
  sales: number;
  stock: number;
  price: string;
}

const topProducts: Product[] = [
  {
    id: '1',
    name: 'Patimax Fragrance Long...',
    image: '/admin/images/products/1.png',
    items: 100,
    couponCode: 'Sflat',
    sales: 1500,
    stock: 85,
    price: '$25.00'
  },
  {
    id: '2',
    name: 'Sunglasses Style',
    image: '/admin/images/products/2.png',
    items: 75,
    couponCode: 'Summer',
    sales: 1200,
    stock: 60,
    price: '$45.00'
  },
  {
    id: '3',
    name: 'Camera Lens 4K',
    image: '/admin/images/products/3.png',
    items: 50,
    couponCode: 'Tech20',
    sales: 800,
    stock: 25,
    price: '$120.00'
  },
  {
    id: '4',
    name: 'Wireless Headphones',
    image: '/admin/images/products/4.png',
    items: 90,
    couponCode: 'Audio',
    sales: 1800,
    stock: 70,
    price: '$85.00'
  }
];

const RecentOrders: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('This Week');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleTimeFilterChange = (filter: string) => {
    setTimeFilter(filter);
    setShowDropdown(false);
  };

  return (
    <div className="tf-section-5 mb-30">
      {/* Chart Section */}
      <div className="wg-box">
        <div className="flex items-center justify-between">
          <h5>Recent Order</h5>
          <div className="dropdown default">
            <button 
              className="btn btn-secondary dropdown-toggle" 
              type="button" 
              onClick={() => setShowDropdown(!showDropdown)}
              aria-haspopup="true" 
              aria-expanded={showDropdown}
            >
              <span className="icon-more">
                <i className="icon-more-horizontal"></i>
              </span>
            </button>
            {showDropdown && (
              <ul className="dropdown-menu dropdown-menu-end show">
                <li>  
                  <button onClick={() => handleTimeFilterChange('This Week')}>
                    This Week
                  </button>
                </li>
                <li>  
                  <button onClick={() => handleTimeFilterChange('Last Week')}>
                    Last Week
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div id="line-chart-5">
          {/* Chart will be implemented with a charting library later */}
          <div className="chart-placeholder" style={{height: '300px', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px'}}>
            <p className="text-muted">Chart for {timeFilter}</p>
          </div>
        </div>
      </div>

      {/* Top Products Section */}
      <div className="wg-box">
        <div className="flex items-center justify-between">
          <h5>Top Products</h5>
          <div className="dropdown default">
            <button 
              className="btn btn-secondary dropdown-toggle" 
              type="button" 
              onClick={() => setShowDropdown(!showDropdown)}
              aria-haspopup="true" 
              aria-expanded={showDropdown}
            >
              <span className="view-all">
                View all<i className="icon-chevron-down"></i>
              </span>
            </button>
            {showDropdown && (
              <ul className="dropdown-menu dropdown-menu-end show">
                <li>  
                  <button onClick={() => handleTimeFilterChange('3 days')}>
                    3 days
                  </button>
                </li>
                <li>  
                  <button onClick={() => handleTimeFilterChange('7 days')}>
                    7 days
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
        
        <div className="wg-table table-top-product">
          <ul className="flex flex-column gap14">
            {topProducts.map((product) => (
              <li key={product.id} className="product-item">
                <div className="image">
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    width={60}
                    height={60}
                    onError={(e) => {
                      // Fallback image if product image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = '/admin/images/products/placeholder.png';
                    }}
                  />
                </div>
                <div className="flex items-center justify-between flex-grow">
                  <div className="name">
                    <Link href={`/products/${product.id}`} className="body-title-2">
                      {product.name}
                    </Link>
                    <div className="text-tiny mt-3">{product.items} Items</div>
                  </div>
                  <div>
                    <div className="text-tiny mb-3">Coupon Code</div>
                    <div className="body-text">{product.couponCode}</div>
                  </div>
                  <div>
                    <div className="text-tiny mb-3">Sales</div>
                    <div className="body-text">{product.sales}</div>
                  </div>
                  <div>
                    <div className="text-tiny mb-3">Stock</div>
                    <div className={`body-text ${product.stock < 30 ? 'text-danger' : 'text-success'}`}>
                      {product.stock}
                    </div>
                  </div>
                  <div>
                    <div className="text-tiny mb-3">Price</div>
                    <div className="body-text font-weight-bold">{product.price}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
