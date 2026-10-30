
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-list',
  standalone: true,
  template: `
    <main class="page">
      <section class="heading">
        <div>
          <span class="eyebrow">ACCOUNT MANAGEMENT</span>
          <h1>User Management</h1>
          <p>View the current administrator account and account workspace.</p>
        </div>
        <span class="status"><i></i> Admin portal</span>
      </section>

      <section class="account-panel">
        <div class="panel-heading">
          <div>
            <span class="eyebrow">CURRENT ACCOUNT</span>
            <h2>Administrator profile</h2>
          </div>
          <div class="verified">✓</div>
        </div>

        <div class="account-details">
          <div class="avatar">{{ initials }}</div>
          <div class="account-info">
            <h3>{{ username }}</h3>
            <p>Administrator</p>
            <span class="role-badge">ADMIN ACCOUNT</span>
          </div>
        </div>

        <div class="detail-row">
          <span>Username</span>
          <strong>{{ username }}</strong>
        </div>
        <div class="detail-row">
          <span>Access level</span>
          <strong>Administrator</strong>
        </div>
        <div class="detail-row">
          <span>Portal status</span>
          <strong>Active session</strong>
        </div>
      </section>

      <section class="notice">
        <div class="notice-icon">i</div>
        <div>
          <h3>User directory</h3>
          <p>
            The backend currently needs a user-list API endpoint before this page
            can display all users or support creating, editing, and deleting user
            accounts.
          </p>
        </div>
      </section>
    </main>
  `,
  styles: [`
    :host { display: block; }

    .page {
      max-width: 1200px;
      margin: 0 auto;
      padding: 30px;
    }

    .heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
      margin-bottom: 25px;
    }

    .eyebrow {
      color: #15803d;
      font-size: 10px;
      font-weight: 900;
      letter-spacing: 1.7px;
    }

    h1 {
      margin: 10px 0;
      color: #123b28;
      font-size: 30px;
      letter-spacing: -0.8px;
    }

    .heading p {
      color: #166534;
      font-size: 12px;
      line-height: 1.7;
    }

    .status {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      border: 1px solid #bbf7d0;
      border-radius: 999px;
      background: #ffffff;
      color: #166534;
      font-size: 11px;
      font-weight: 800;
      white-space: nowrap;
    }

    .status i {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #22c55e;
    }

    .account-panel {
      max-width: 760px;
      padding: 26px;
      border: 1px solid #dcfce7;
      border-radius: 18px;
      background: #ffffff;
    }

    .panel-heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
      margin-bottom: 25px;
    }

    .panel-heading h2 {
      margin: 8px 0 0;
      color: #123b28;
      font-size: 19px;
    }

    .verified {
      display: grid;
      width: 38px;
      height: 38px;
      place-items: center;
      border-radius: 12px;
      background: #dcfce7;
      color: #166534;
      font-weight: 900;
    }

    .account-details {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 25px;
      padding: 20px;
      border: 1px solid #dcfce7;
      border-radius: 14px;
      background: #f0fdf4;
    }

    .avatar {
      display: grid;
      width: 58px;
      height: 58px;
      flex: 0 0 58px;
      place-items: center;
      border: 2px solid #bbf7d0;
      border-radius: 17px;
      background: #dcfce7;
      color: #14532d;
      font-size: 20px;
      font-weight: 900;
    }

    .account-info h3 {
      margin: 0 0 5px;
      color: #123b28;
      font-size: 18px;
    }

    .account-info p {
      margin: 0 0 9px;
      color: #166534;
      font-size: 12px;
    }

    .role-badge {
      display: inline-block;
      padding: 5px 8px;
      border-radius: 6px;
      background: #dcfce7;
      color: #166534;
      font-size: 9px;
      font-weight: 900;
      letter-spacing: 0.8px;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      gap: 15px;
      padding: 16px 0;
      border-bottom: 1px solid #f0fdf4;
      color: #166534;
      font-size: 12px;
    }

    .detail-row:last-child {
      border-bottom: 0;
    }

    .detail-row strong {
      color: #14532d;
      text-align: right;
    }

    .notice {
      display: flex;
      max-width: 760px;
      gap: 14px;
      margin-top: 20px;
      padding: 20px;
      border: 1px solid #bbf7d0;
      border-radius: 15px;
      background: #f0fdf4;
    }

    .notice-icon {
      display: grid;
      width: 32px;
      height: 32px;
      flex: 0 0 32px;
      place-items: center;
      border-radius: 10px;
      background: #dcfce7;
      color: #166534;
      font-weight: 900;
    }

    .notice h3 {
      margin: 3px 0 8px;
      color: #14532d;
      font-size: 13px;
    }

    .notice p {
      margin: 0;
      color: #166534;
      font-size: 12px;
      line-height: 1.8;
    }

    @media (max-width: 600px) {
      .page { padding: 18px; }
      .heading {
        align-items: flex-start;
        flex-direction: column;
      }
      .account-panel { padding: 18px; }
      .detail-row { align-items: flex-start; }
    }
  `]
})
export class UserList {
  private currentUser: any = this.readCurrentUser();

  username: string =
    this.currentUser?.username ??
    this.currentUser?.userName ??
    'Admin';

  initials = this.username
    .trim()
    .slice(0, 2)
    .toUpperCase();

  private readCurrentUser(): any {
    try {
      return JSON.parse(localStorage.getItem('currentUser') ?? 'null');
    } catch {
      return null;
    }
  }
}
