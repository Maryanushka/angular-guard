import { Directive, ElementRef, inject, DestroyRef, afterNextRender, output } from '@angular/core';

@Directive({
	selector: '[appObserveInView]',
	standalone: true,
})
export class ObserveInViewDirective {
	private el = inject(ElementRef<HTMLElement>);
	private destroyRef = inject(DestroyRef);

	readonly inView = output<void>();

	constructor() {
		afterNextRender(() => {
			const observer = new IntersectionObserver(
				(entries) => {
					if (entries[0]?.isIntersecting) this.inView.emit();
				},
				{ rootMargin: '200px', threshold: 0 }
			);
			observer.observe(this.el.nativeElement);
			this.destroyRef.onDestroy(() => observer.disconnect());
		});
	}
}
