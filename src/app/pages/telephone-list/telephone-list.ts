
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-telephone-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="page">
      <section class="page-heading">
        <div>
          <span class="eyebrow">TELEPHONE MANAGEMENT</span>
          <h1>Telephone List</h1>
          <p>View and manage telephone records from one workspace.</p>
        </div>
        <button class="primary-button" (click)="openAdd()">
          <span>＋</span> Add telephone
        </button>
      </section>

      <section class="stats">
        <article class="stat-card">
          <span class="stat-icon">☎</span>
          <div>
            <span class="stat-label">TOTAL RECORDS</span>
            <strong>{{ rows.length }}</strong>
            <small>Telephone entries</small>
          </div>
        </article>

        <article class="stat-card">
          <span class="stat-icon">⌕</span>
          <div>
            <span class="stat-label">SEARCH RESULTS</span>
            <strong>{{ filteredRows.length }}</strong>
            <small>Matching entries</small>
          </div>
        </article>

        <article class="stat-card">
          <span class="stat-icon">✓</span>
          <div>
            <span class="stat-label">DATA STATUS</span>
            <strong>{{ loading ? 'Loading' : (loadError ? 'Error' : 'Ready') }}</strong>
            <small>{{ loading ? 'Retrieving records' : 'Telephone workspace' }}</small>
          </div>
        </article>
      </section>

      <section class="table-panel">
        <div class="table-heading">
          <div>
            <h2>Telephone records</h2>
            <p>Search, review, and manage your records.</p>
          </div>

          <div class="search-box">
            <span>⌕</span>
            <input
              type="search"
              [(ngModel)]="searchTerm"
              placeholder="Search records..."
              aria-label="Search telephone records"
            />
          </div>
        </div>

        <div *ngIf="loading" class="message-state">
          <span class="loading-dot"></span>
          Loading telephone records...
        </div>

        <div *ngIf="loadError && !loading" class="message-state error-state">
          <strong>Unable to load telephone records</strong>
          <p>{{ loadError }}</p>
          <button class="secondary-button" (click)="loadData()">Try again</button>
        </div>

        <div *ngIf="!loading && !loadError && columns.length === 0" class="empty-state">
          <div class="empty-icon">☎</div>
          <h3>No telephone records yet</h3>
          <p>Add a record to get started.</p>
          <button class="primary-button" (click)="openAdd()">Add telephone</button>
        </div>

        <div
          *ngIf="!loading && !loadError && columns.length > 0"
          class="table-scroll"
        >
          <table>
            <thead>
              <tr>
                <th *ngFor="let column of columns">{{ formatColumn(column) }}</th>
                <th class="actions-column">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let row of filteredRows">
                <td *ngFor="let column of columns">
                  <span class="cell-value">{{ displayValue(row[column]) }}</span>
                </td>
                <td class="actions-cell">
                  <button class="table-action edit-action" (click)="openEdit(row)">
                    Edit
                  </button>
                  <button class="table-action delete-action" (click)="deleteRecord(row)">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div *ngIf="filteredRows.length === 0" class="no-results">
            No records match your search.
          </div>
        </div>

        <div class="table-footer">
          <span>Showing <strong>{{ filteredRows.length }}</strong> of <strong>{{ rows.length }}</strong> records</span>
          <button class="secondary-button" (click)="loadData()" [disabled]="loading">
            ↻ Refresh
          </button>
        </div>
      </section>

      <div *ngIf="modalOpen" class="modal-backdrop" (click)="closeModal()">
        <section
          class="modal-card"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          (click)="$event.stopPropagation()"
        >
          <div class="modal-heading">
            <div>
              <span class="eyebrow">TELEPHONE RECORD</span>
              <h2 id="modal-title">{{ editingId === null ? 'Add telephone' : 'Edit telephone' }}</h2>
              <p>Enter the record data in JSON format.</p>
            </div>
            <button class="close-button" (click)="closeModal()" aria-label="Close dialog">×</button>
          </div>

          <label for="record-json">Record data</label>
          <textarea
            id="record-json"
            [(ngModel)]="recordText"
            rows="10"
            spellcheck="false"
            placeholder='{"name":"Example","number":"123456"}'
          ></textarea>

          <p *ngIf="saveError" class="form-error">{{ saveError }}</p>

          <div class="modal-actions">
            <button class="secondary-button" (click)="closeModal()">Cancel</button>
            <button class="primary-button" (click)="saveRecord()" [disabled]="saving">
              {{ saving ? 'Saving...' : 'Save record' }}
            </button>
          </div>
        </section>
      </div>
    </main>
  `,
  styles: [`
    :host { display: block; }

    .page {
      max-width: 1500px;
      margin: 0 auto;
      padding: 30px;
    }

    .page-heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 25px;
    }

    .eyebrow {
      color: #15803d;
      font-size: 10px;
      font-weight: 900;
      letter-spacing: 1.7px;
    }

    h1 {
      margin: 9px 0;
      color: #123b28;
      font-size: 30px;
      letter-spacing: -0.8px;
    }

    .page-heading p,
    .table-heading p,
    .modal-heading p {
      margin: 0;
      color: #166534;
      font-size: 12px;
      line-height: 1.7;
    }

    .primary-button,
    .secondary-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-height: 39px;
      padding: 10px 14px;
      border-radius: 9px;
      font-size: 12px;
      font-weight: 800;
    }

    .primary-button {
      border: 1px solid #15803d;
      background: #15803d;
      color: #ffffff;
    }

    .primary-button:hover {
      background: #14532d;
    }

    .primary-button:disabled {
      cursor: wait;
      opacity: 0.65;
    }

    .secondary-button {
      border: 1px solid #bbf7d0;
      background: #ffffff;
      color: #166534;
    }

    .secondary-button:hover {
      background: #f0fdf4;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
      margin-bottom: 22px;
    }

    .stat-card {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 20px;
      border: 1px solid #dcfce7;
      border-radius: 15px;
      background: #ffffff;
    }

    .stat-icon {
      display: grid;
      width: 45px;
      height: 45px;
      flex: 0 0 45px;
      place-items: center;
      border-radius: 13px;
      background: #dcfce7;
      color: #166534;
      font-size: 23px;
    }

    .stat-card > div {
      display: flex;
      min-width: 0;
      flex-direction: column;
      gap: 5px;
    }

    .stat-label {
      color: #15803d;
      font-size: 9px;
      font-weight: 900;
      letter-spacing: 1px;
    }

    .stat-card strong {
      color: #123b28;
      font-size: 22px;
    }

    .stat-card small {
      color: #166534;
      font-size: 10px;
    }

    .table-panel {
      overflow: hidden;
      border: 1px solid #dcfce7;
      border-radius: 17px;
      background: #ffffff;
    }

    .table-heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
      padding: 23px;
      border-bottom: 1px solid #dcfce7;
    }

    .table-heading h2 {
      margin: 0 0 7px;
      color: #123b28;
      font-size: 17px;
    }

    .search-box {
      display: flex;
      width: min(280px, 100%);
      min-height: 41px;
      align-items: center;
      gap: 9px;
      padding: 0 12px;
      border: 1px solid #bbf7d0;
      border-radius: 9px;
      color: #15803d;
    }

    .search-box > span {
      font-size: 20px;
    }

    .search-box input {
      width: 100%;
      min-width: 0;
      border: 0;
      outline: 0;
      background: transparent;
      color: #123b28;
      font-size: 12px;
    }

    .search-box input::placeholder {
      color: #166534;
      opacity: 0.75;
    }

    .table-scroll {
      width: 100%;
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }

    th {
      padding: 14px 18px;
      background: #f0fdf4;
      color: #166534;
      font-size: 10px;
      font-weight: 900;
      letter-spacing: 0.7px;
      white-space: nowrap;
    }

    td {
      padding: 15px 18px;
      border-top: 1px solid #f0fdf4;
      color: #14532d;
      font-size: 12px;
      white-space: nowrap;
    }

    tbody tr:hover {
      background: #f0fdf4;
    }

    .cell-value {
      display: inline-block;
      max-width: 260px;
      overflow: hidden;
      text-overflow: ellipsis;
      vertical-align: middle;
    }

    .actions-column,
    .actions-cell {
      text-align: right;
      white-space: nowrap;
    }

    .table-action {
      margin-left: 6px;
      padding: 7px 9px;
      border-radius: 7px;
      font-size: 10px;
      font-weight: 800;
    }

    .edit-action {
      border: 1px solid #bbf7d0;
      background: #f0fdf4;
      color: #166534;
    }

    .delete-action {
      border: 1px solid #86efac;
      background: #dcfce7;
      color: #14532d;
    }

    .table-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 16px 22px;
      border-top: 1px solid #dcfce7;
      color: #166534;
      font-size: 11px;
    }

    .message-state,
    .empty-state,
    .no-results {
      padding: 38px 20px;
      text-align: center;
      color: #166534;
      line-height: 1.7;
    }

    .message-state p,
    .empty-state p {
      font-size: 12px;
    }

    .error-state strong {
      color: #14532d;
    }

    .empty-icon {
      display: grid;
      width: 60px;
      height: 60px;
      margin: 0 auto 15px;
      place-items: center;
      border-radius: 18px;
      background: #dcfce7;
      color: #166534;
      font-size: 30px;
    }

    .empty-state h3 {
      margin: 0;
      color: #123b28;
    }

    .empty-state .primary-button {
      margin-top: 10px;
    }

    .loading-dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      margin-right: 9px;
      border-radius: 50%;
      background: #22c55e;
    }

    .modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: 100;
      display: grid;
      place-items: center;
      overflow-y: auto;
      padding: 20px;
      background: #123b28b8;
    }

    .modal-card {
      width: 100%;
      max-width: 560px;
      padding: 25px;
      border: 1px solid #bbf7d0;
      border-radius: 19px;
      background: #ffffff;
      box-shadow: 0 20px 60px #123b2830;
    }

    .modal-heading {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 15px;
      margin-bottom: 22px;
    }

    .modal-heading h2 {
      margin: 8px 0;
      color: #123b28;
      font-size: 22px;
    }

    .close-button {
      width: 35px;
      height: 35px;
      border: 1px solid #bbf7d0;
      border-radius: 9px;
      background: #f0fdf4;
      color: #166534;
      font-size: 23px;
    }

    .modal-card label {
      display: block;
      margin-bottom: 9px;
      color: #14532d;
      font-size: 12px;
      font-weight: 800;
    }

    .modal-card textarea {
      width: 100%;
      resize: vertical;
      padding: 13px;
      border: 1px solid #bbf7d0;
      border-radius: 10px;
      background: #f0fdf4;
      color: #123b28;
      font-family: Consolas, monospace;
      font-size: 12px;
      line-height: 1.7;
    }

    .form-error {
      color: #14532d;
      font-size: 12px;
      line-height: 1.6;
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
    }

    @media (max-width: 850px) {
      .page {
        padding: 20px;
      }

      .stats {
        grid-template-columns: 1fr;
      }

      .table-heading {
        align-items: stretch;
        flex-direction: column;
      }

      .search-box {
        width: 100%;
      }
    }

    @media (max-width: 550px) {
      .page-heading {
        align-items: flex-start;
        flex-direction: column;
      }

      .page-heading .primary-button {
        width: 100%;
      }

      .page {
        padding: 15px;
      }

      .table-footer {
        align-items: flex-start;
        flex-direction: column;
      }
    }
  `]
})
export class TelephoneList implements OnInit {
  private readonly apiUrl = 'http://localhost:5046/api/Telephone';

  rows: any[] = [];
  columns: string[] = [];
  searchTerm = '';
  loading = false;
  saving = false;
  loadError = '';
  saveError = '';
  modalOpen = false;
  editingId: any = null;
  recordText = '{}';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  get filteredRows(): any[] {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      return this.rows;
    }

    return this.rows.filter((row) =>
      Object.values(row).some((value) =>
        this.displayValue(value).toLowerCase().includes(term)
      )
    );
  }

  loadData(): void {
    this.loading = true;
    this.loadError = '';

    this.http.get<any>(this.apiUrl).subscribe({
      next: (response) => {
        const data = Array.isArray(response)
          ? response
          : response?.$values ??
            response?.items ??
            response?.data ??
            [];

        this.rows = Array.isArray(data) ? data : [];
        this.columns = this.rows.length
          ? Object.keys(this.rows[0]).filter(
              (key) => typeof this.rows[0][key] !== 'object'
            )
          : [];
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.loadError =
          error?.error?.message ??
          'The API could not return telephone records. Make sure the backend is running.';
      }
    });
  }

  openAdd(): void {
    this.editingId = null;
    this.recordText = '{}';
    this.saveError = '';
    this.modalOpen = true;
  }

  openEdit(row: any): void {
    this.editingId = this.getId(row);
    this.recordText = JSON.stringify(row, null, 2);
    this.saveError = '';
    this.modalOpen = true;
  }

  closeModal(): void {
    if (!this.saving) {
      this.modalOpen = false;
      this.saveError = '';
    }
  }

  saveRecord(): void {
    let payload: any;

    try {
      payload = JSON.parse(this.recordText);

      if (!payload || Array.isArray(payload) || typeof payload !== 'object') {
        this.saveError = 'Enter one JSON object for the telephone record.';
        return;
      }
    } catch {
      this.saveError = 'The JSON format is invalid. Please correct it and try again.';
      return;
    }

    this.saving = true;
    this.saveError = '';

    const request = this.editingId === null
      ? this.http.post(this.apiUrl, payload)
      : this.http.put(
          `${this.apiUrl}/${encodeURIComponent(String(this.editingId))}`,
          payload
        );

    request.subscribe({
      next: () => {
        this.saving = false;
        this.modalOpen = false;
        this.loadData();
      },
      error: (error) => {
        this.saving = false;
        this.saveError =
          error?.error?.message ??
          'Unable to save this record. Check the required fields and try again.';
      }
    });
  }

  deleteRecord(row: any): void {
    const id = this.getId(row);

    if (id === null || id === undefined) {
      this.loadError = 'This record has no identifiable ID and cannot be deleted.';
      return;
    }

    if (!window.confirm('Delete this telephone record?')) {
      return;
    }

    this.http.delete(
      `${this.apiUrl}/${encodeURIComponent(String(id))}`
    ).subscribe({
      next: () => this.loadData(),
      error: (error) => {
        this.loadError =
          error?.error?.message ??
          'Unable to delete this record.';
      }
    });
  }

  getId(row: any): any {
    const key = Object.keys(row).find(
      (name) => name.toLowerCase() === 'id' ||
        name.toLowerCase().endsWith('id')
    );

    return key ? row[key] : null;
  }

  formatColumn(column: string): string {
    return column
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/[_-]/g, ' ')
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  displayValue(value: any): string {
    if (value === null || value === undefined) {
      return '—';
    }

    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }

    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    return String(value);
  }
}
