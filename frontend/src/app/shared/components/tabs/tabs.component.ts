import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

export interface TabItem {
	label: string;
	content: string;
}

@Component({
	selector: 'app-tabs',
	templateUrl: './tabs.component.html',
	styleUrls: ['./tabs.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
	tabs = input.required<TabItem[]>();

	activeIndex = signal(0);

	activeTab = computed(() => {
		const list = this.tabs();
		const idx = this.activeIndex();
		return list.length > 0 && idx >= 0 && idx < list.length ? list[idx] : null;
	});

	setActive(index: number) {
		this.activeIndex.set(index);
	}
}
