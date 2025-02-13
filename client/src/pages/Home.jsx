import React from 'react'
import './Home.css'


function Home() {
  return (
    <>
      <div>
        <nav>
          <div className="logo">Share a meal</div>
          <div className="nav-links">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Order</a>
            <a href="#">Log out</a>
            <button className="search-btn">Donate</button>
            <button className="Spot" />
            <button className="Profile" />
          </div>
        </nav>
        <div className="cen">
          <div className="hero">
            <div className='img'></div>
            <h1>Sharing is caring</h1>
            <button className="find-meal">Find a Meal</button>
          </div>
        </div>
        <section className="how-it-works">
          <h2>How it works</h2>
          <div className="steps">
            <div className="step-card">
              <h3>Create a Listing</h3>
              <p>
                Share details about your meal including type, ingredients, and
                available portions
              </p>
            </div>
            <div className="step-card">
              <h3>Connect with Community</h3>
              <p>
                Find people nearby who are sharing meals or request a specific dish
              </p>
            </div>
            <div className="step-card">
              <h3>Share &amp; Enjoy</h3>
              <p>
                Meet your neighbors and enjoy delicious home-cooked meals together
              </p>
            </div>
          </div>
        </section>
        <div className="cen">
          <section className="share-love">
            <h2>Share the love</h2>
            <p>See what our share a meal supporters has to say about us</p>
          </section>
        </div>
        <div className="cen">
          <section className="more-info">
            <div className="newsletter">
              <h2>Never miss another Chance</h2>
              <div className="email-form">
                <input type="email" placeholder="Enter your email here" />
                <button className="join-btn">Join</button>
              </div>
            </div>
          </section>
        </div>
      </div>

    </>
  )
}

export default Home