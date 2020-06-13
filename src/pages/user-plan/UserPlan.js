import React from 'react';
import { Icon, Divider } from 'antd';

import './UserPlan.css';

export default function UserPlan() {
  return (
    <div id="price" className="container-fluid">
      <img
        className="paper-plane"
        src="https://pngimg.com/uploads/paper_plane/paper_plane_PNG83.png"
        alt="paper-plane"
      />
      <div className="plan basic">
        <div className="plan-inner">
          <div className="entry-title">
            <h3>Basic PACKAGE</h3>
            <div className="price">$Free<span>/PER MONTH</span>
            </div>
          </div>
          <div className="entry-content">
            <ul>
              <li><strong><Icon type="check" /></strong> Compile &amp; run challenge</li>
              <li><strong><Icon type="check" /></strong> View public testcases</li>
              <li><strong><Icon type="check" /></strong> Manage your dashboard</li>
              <li><strong><Icon type="check" /></strong> Participate contests</li>
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
            <div className="price">80k<span>/PER MONTH</span>
            </div>
          </div>
          <div className="entry-content">
            <ul>
              <li><strong><Icon type="check" /></strong> Save your submissions</li>
              <li><strong><Icon type="check" /></strong> View hidden testcases</li>
              <li><strong><Icon type="check" /></strong> Manage challenges</li>
              <li><strong><Icon type="check" /></strong> Manage tutorials</li>
              <Divider />
              <li><strong><Icon type="check" /></strong> Compile &amp; run challenge</li>
              <li><strong><Icon type="check" /></strong> View public testcases</li>
              <li><strong><Icon type="check" /></strong> Manage your dashboard</li>
              <li><strong><Icon type="check" /></strong> Participate contests</li>
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
            <div className="price">100k<span>/PER MONTH</span>
            </div>
          </div>
          <div className="entry-content">
            <ul>
              <li><strong><Icon type="check" /></strong> Manage your contests</li>
              <li><strong><Icon type="check" /></strong> View your contest statistics</li>
              <Divider />
              <li><strong><Icon type="check" /></strong> Save your submissions</li>
              <li><strong><Icon type="check" /></strong> View hidden testcases</li>
              <li><strong><Icon type="check" /></strong> Manage challenges</li>
              <li><strong><Icon type="check" /></strong> Manage tutorials</li>
              <Divider />
              <li><strong><Icon type="check" /></strong> Compile &amp; run challenge</li>
              <li><strong><Icon type="check" /></strong> View public testcases</li>
              <li><strong><Icon type="check" /></strong> Manage your dashboard</li>
              <li><strong><Icon type="check" /></strong> Participate contests</li>
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