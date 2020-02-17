import React from 'react';
import './UserPlan.css';

export default function UserPlan() {
  return (
    <div id="price" className="container-fluid">
      <div className="plan basic">
        <div className="plan-inner">
          <div className="entry-title">
            <h3>Basic PACKAGE</h3>
            <div className="price">$Free<span>/PER YEAR</span>
            </div>
          </div>
          <div className="entry-content">
            <ul>
              <li><strong>1x</strong> option 1</li>
              <li><strong>2x</strong> option 2</li>
              <li><strong>3x</strong> option 3</li>
              <li><strong>Free</strong> option 4</li>
              <li><strong>Unlimited</strong> option 5</li>
            </ul>
          </div>
          <div className="btn">
            <a href="/user-plan">Only Login</a>
          </div>
        </div>
      </div>

      <div className="plan standard">
        <div className="plan-inner">
          <div className="hot">hot</div>
          <div className="entry-title">
            <h3>STANDARD PACKAGE</h3>
            <div className="price">$75<span>/PER YEAR</span>
            </div>
          </div>
          <div className="entry-content">
            <ul>
              <li><strong>2x</strong> Free Entrance</li>
              <li><strong>Free</strong> Snacks</li>
              <li><strong>Custom</strong> Swags</li>
              <li><strong>2x</strong> Certificate</li>
              <li><strong>Free</strong> Wifi</li>
            </ul>
          </div>
          <div className="btn">
            <a href="/user-plan">Register</a>
          </div>
        </div>
      </div>

      <div className="plan ultimite">
        <div className="plan-inner">
          <div className="hot">hot</div>
          <div className="entry-title">
            <h3>PREMIUM PACKAGE</h3>
            <div className="price">$100<span>/PER YEAR</span>
            </div>
          </div>
          <div className="entry-content">
            <ul>
              <li><strong>1x</strong> option 1</li>
              <li><strong>2x</strong> option 2</li>
              <li><strong>3x</strong> option 3</li>
              <li><strong>Free</strong> option 4</li>
              <li><strong>Unlimited</strong> option 5</li>
            </ul>
          </div>
          <div className="btn">
            <a href="/user-plan">Register</a>
          </div>
        </div>
      </div>
    </div>
  );
}