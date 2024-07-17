import React from 'react';
import { Link } from 'react-router-dom';
import '../style/style.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <div class="card_view">
        <h1 class="heading">
          Welcome to Generate Resume! <br /> Let's create your resume.
        </h1>
        <Link to="/generate-resume">
          <button class="btn-generate">Generate Resume</button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
