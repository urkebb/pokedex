import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface SidebarState {
	open: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private readonly state$ = new BehaviorSubject<SidebarState>({ open: false });

  getState() {
    return this.state$.asObservable();
  }

  setState(state: SidebarState) {
    this.state$.next(state);
  }

  constructor() { }

}
