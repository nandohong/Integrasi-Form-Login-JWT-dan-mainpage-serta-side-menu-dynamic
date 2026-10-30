
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="dashboard">
      <header class="page-heading">
        <div>
          <p class="eyebrow">OVERVIEW</p>
          <h1>Welcome back, Admin.</h1>
          <p class="description">
            Manage your telephone records and users from one place.
          </p>
        </div>
        <span class="admin-badge">A</span>
      </header>

      <div class="section-heading">
        <h2>Your workspace</h2>
        <p>Choose a section to get started.</p>
      </div>

      <div class="feature-grid">
        <a class="feature-card" routerLink="/telephones">
          <span class="feature-icon phone-icon" aria-hidden="true">
            <span></span>
          </span>

          <div class="feature-content">
            <span class="feature-category">RECORDS</span>
            <h3>Telephone List</h3>
            <p>View and manage telephone records.</p>
          </div>

          <span class="feature-arrow" aria-hidden="true">↗</span>
        </a>

        <a class="feature-card" routerLink="/users">
          <span class="feature-icon users-icon" aria-hidden="true">
            <span></span>
            <span></span>
          </span>

          <div class="feature-content">
            <span class="feature-category">ACCOUNTS</span>
            <h3>User Management</h3>
            <p>Access the user management section.</p>
          </div>

          <span class="feature-arrow" aria-hidden="true">↗</span>
        </a>
      </div>

      <section class="note">
        <span class="note-line"></span>
        <div>
          <h2>Everything in its place.</h2>
          <p>
            Use the sidebar to move between sections.
            Your workspace is designed to keep daily tasks simple.
          </p>
        </div>
      </section>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .dashboard {
      width: 100%;
      max-width: 1040px;
      margin: 0 auto;
    }

    .page-heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      padding-bottom: 29px;
      border-bottom: 1px solid #e7ede7;
    }

    .eyebrow {
      margin: 0 0 12px;
      color: #648d6e;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 1.4px;
    }

    .page-heading h1 {
      margin: 0;
      color: #293b2e;
      font-size: clamp(24px, 3vw, 30px);
      font-weight: 600;
      line-height: 1.3;
      letter-spacing: -1.15px;
    }

    .description {
      margin: 10px 0 0;
      color: #829087;
      font-size: 12px;
      line-height: 1.8;
    }

    .admin-badge {
      display: grid;
      flex: 0 0 42px;
      width: 42px;
      height: 42px;
      place-items: center;
      color: #3d7850;
      background: #eaf4ec;
      border: 1px solid #e0eee2;
      border-radius: 50%;
      font-size: 14px;
      font-weight: 600;
    }

    .section-heading {
      margin: 30px 0 17px;
    }

    .section-heading h2 {
      margin: 0;
      color: #334637;
      font-size: 15px;
      font-weight: 600;
      letter-spacing: -0.3px;
    }

    .section-heading p {
      margin: 7px 0 0;
      color: #89948c;
      font-size: 11px;
      line-height: 1.7;
    }

    .feature-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }

    .feature-card {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      min-height: 222px;
      padding: 23px;
      background: #fff;
      border: 1px solid #e5ece5;
      border-radius: 12px;
      transition: border-color 160ms ease, background 160ms ease;
    }

    .feature-card:hover {
      background: #fcfefc;
      border-color: #bcd9c2;
    }

    .feature-icon {
      position: relative;
      display: grid;
      width: 39px;
      height: 39px;
      place-items: center;
      color: #4c835b;
      background: #edf5ee;
      border-radius: 10px;
    }

    .phone-icon span {
      position: relative;
      display: block;
      width: 13px;
      height: 21px;
      border: 1.5px solid currentColor;
      border-radius: 3px;
    }

    .phone-icon span::before {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 5px;
      height: 1px;
      background: currentColor;
      content: '';
    }

    .phone-icon span::after {
      position: absolute;
      bottom: 2px;
      left: 5px;
      width: 2px;
      height: 2px;
      background: currentColor;
      border-radius: 50%;
      content: '';
    }

    .users-icon span:first-child {
      position: absolute;
      top: 9px;
      left: 12px;
      width: 9px;
      height: 9px;
      border: 1.5px solid currentColor;
      border-radius: 50%;
    }

    .users-icon span:last-child {
      position: absolute;
      bottom: 8px;
      left: 8px;
      width: 18px;
      height: 9px;
      border: 1.5px solid currentColor;
      border-radius: 10px 10px 5px 5px;
    }

    .feature-content {
      margin-top: 23px;
    }

    .feature-category {
      color: #8c9a8f;
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 1.1px;
    }

    .feature-content h3 {
      margin: 8px 0 7px;
      color: #2d4132;
      font-size: 15px;
      font-weight: 600;
      letter-spacing: -0.3px;
    }

    .feature-content p {
      margin: 0;
      color: #849087;
      font-size: 11px;
      line-height: 1.7;
    }

    .feature-arrow {
      position: absolute;
      top: 23px;
      right: 22px;
      color: #7b9981;
      font-size: 16px;
      transition: transform 160ms ease;
    }

    .feature-card:hover .feature-arrow {
      transform: translate(2px, -2px);
    }

    .note {
      display: flex;
      gap: 15px;
      margin-top: 31px;
      padding: 21px 22px;
      background: #f2f7f2;
      border: 1px solid #e8f0e8;
      border-radius: 10px;
    }

    .note-line {
      flex: 0 0 3px;
      align-self: stretch;
      background: #8bb797;
      border-radius: 3px;
    }

    .note h2 {
      margin: 0 0 7px;
      color: #3b5842;
      font-size: 12px;
      font-weight: 600;
    }

    .note p {
      max-width: 650px;
      margin: 0;
      color: #7d8c80;
      font-size: 11px;
      line-height: 1.8;
    }

    @media (max-width: 650px) {
      .page-heading {
        align-items: flex-start;
        padding-bottom: 23px;
      }

      .admin-badge {
        flex-basis: 35px;
        width: 35px;
        height: 35px;
      }

      .feature-grid {
        grid-template-columns: 1fr;
        gap: 12px;
      }

      .feature-card {
        min-height: 200px;
        padding: 20px;
      }

      .note {
        padding: 17px;
      }
    }
  `]
})
export class Dashboard {}
