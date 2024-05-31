import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, filter, take, takeUntil } from 'rxjs';
import { NavigationModule } from '../../shared/components/navigation/navigation.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavigationModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
