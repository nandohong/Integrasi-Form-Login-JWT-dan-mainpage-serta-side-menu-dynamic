
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly apiUrl = 'http://localhost:5046/api';

  currentUser: any = null;
  menus: any[] = [];

  loginForm = {
    username: '',
    password: ''
  };

  loginError = '';
  isLoggingIn = false;
  sidebarCollapsed = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const savedUser = localStorage.getItem('currentUser');
    const savedToken = localStorage.getItem('token');

    if (!savedUser || !savedToken) return;

    try {
      this.currentUser = JSON.parse(savedUser);
      this.loadMenus();
    } catch {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
    }
  }

  login(): void {
    this.loginError = '';
    this.isLoggingIn = true;

    this.http.post<any>(
      `${this.apiUrl}/Auth/login`,
      this.loginForm
    ).subscribe({
      next: (response) => {
        // Simpan JWT token
        localStorage.setItem('token', response.token);

        const user = response?.user ?? response?.data ?? response;

        this.currentUser = {
          ...user,
          userId:
            user?.userId ??
            user?.UserId ??
            user?.id ??
            user?.Id ??
            response?.userId ??
            response?.UserId ??
            1,
          username:
            user?.username ??
            user?.Username ??
            user?.userName ??
            user?.UserName ??
            response?.username ??
            this.loginForm.username
        };

        localStorage.setItem(
          'currentUser',
          JSON.stringify(this.currentUser)
        );

        this.isLoggingIn = false;
        this.loadMenus();
        this.router.navigateByUrl('/dashboard');
      },
      error: (error) => {
        this.isLoggingIn = false;
        this.loginError =
          error?.error?.message ??
          error?.error?.title ??
          'Login failed. Please check your username and password.';
      }
    });
  }

  loadMenus(): void {
    const userId = this.currentUser?.userId ?? 1;

    this.http.get<any>(
      `${this.apiUrl}/Menus/${userId}`
    ).subscribe({
      next: (response) => {
        const result = Array.isArray(response)
          ? response
          : response?.$values ??
            response?.items ??
            response?.data ??
            response?.menus ??
            [];

        this.menus = Array.isArray(result)
          ? result.filter((menu: any) => {
              const canRead = this.readProperty(menu, [
                'canRead',
                'CanRead'
              ]);

              return canRead !== false;
            })
          : [];
      },
      error: (error) => {
        console.error('Failed to load menus:', error);
        this.menus = [];
      }
    });
  }

  private readProperty(item: any, names: string[]): any {
    if (!item || typeof item !== 'object') {
      return undefined;
    }

    for (const name of names) {
      if (item[name] !== undefined && item[name] !== null) {
        return item[name];
      }
    }

    const targetNames = names.map((name) => name.toLowerCase());

    const actualKey = Object.keys(item).find((key) =>
      targetNames.includes(key.toLowerCase())
    );

    return actualKey ? item[actualKey] : undefined;
  }

  private normalizeId(value: any): string {
    return value === undefined || value === null
      ? ''
      : String(value);
  }

  get parentMenus(): any[] {
    return this.menus.filter((menu) => {
      const parentId = this.readProperty(menu, ['parentId']);

      return (
        parentId === null ||
        parentId === undefined ||
        Number(parentId) === 0
      );
    });
  }

  getChildren(parent: any): any[] {
    const parentId = this.readProperty(parent, [
      'menuId',
      'id'
    ]);

    if (parentId === undefined || parentId === null) {
      return [];
    }

    return this.menus.filter((menu) => {
      const childParentId = this.readProperty(menu, ['parentId']);

      return (
        this.normalizeId(childParentId) ===
        this.normalizeId(parentId)
      );
    });
  }

  getMenuName(menu: any): string {
    return String(
      this.readProperty(menu, [
        'menuName',
        'name',
        'title',
        'menuTitle',
        'displayName'
      ]) ?? 'Menu'
    ).trim();
  }

  getMenuRoute(menu: any): string {
    const name = this.getMenuName(menu).toLowerCase();

    const nameRoutes: Record<string, string> = {
      dashboard: '/dashboard',
      'telephone list': '/telephones',
      'user list': '/users',
      settings: '/settings',
      materials: '/materials',
      schedule: '/schedule'
    };

    const rawRoute = this.readProperty(menu, [
      'menuUrl',
      'url',
      'route',
      'path',
      'menuPath',
      'navigationUrl'
    ]);

    if (typeof rawRoute === 'string') {
      const route = rawRoute.trim();

      if (
        route &&
        route !== '#' &&
        route.toLowerCase() !== 'null' &&
        route.toLowerCase() !== 'undefined'
      ) {
        const normalizedRoute = `/${route.replace(/^\/+/, '')}`
          .replace(/\/+$/, '')
          .toLowerCase();

        const allowedRoutes = [
          '/dashboard',
          '/telephones',
          '/users',
          '/settings',
          '/materials',
          '/schedule'
        ];

        if (allowedRoutes.includes(normalizedRoute)) {
          return normalizedRoute;
        }
      }
    }

    return nameRoutes[name] ?? '';
  }

  getMenuIcon(menu: any): string {
    const name = this.getMenuName(menu).toLowerCase();

    if (name.includes('dashboard')) return 'D';
    if (name.includes('telephone')) return 'T';
    if (name.includes('user')) return 'U';
    if (name.includes('setting')) return 'S';
    if (name.includes('schedule')) return 'C';
    if (name.includes('material')) return 'M';

    return '•';
  }

  get pageTitle(): string {
    const url = this.router.url.split('?')[0];

    if (url.startsWith('/telephones')) return 'Telephone List';
    if (url.startsWith('/users')) return 'User List';
    if (url.startsWith('/settings')) return 'Settings';
    if (url.startsWith('/materials')) return 'Materials';
    if (url.startsWith('/schedule')) return 'Schedule';

    return 'Dashboard';
  }

  getInitials(): string {
    const username =
      this.currentUser?.username ??
      this.currentUser?.userName ??
      'Admin';

    return String(username)
      .trim()
      .slice(0, 2)
      .toUpperCase();
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  closeSidebarOnMobile(): void {
    if (window.innerWidth <= 760) {
      this.sidebarCollapsed = false;
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');

    this.currentUser = null;
    this.menus = [];
    this.loginForm = { username: '', password: '' };
    this.loginError = '';
    this.sidebarCollapsed = false;

    this.router.navigateByUrl('/');
  }
}
