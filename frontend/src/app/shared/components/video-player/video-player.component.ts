import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-video-player',
	templateUrl: './video-player.component.html',
	styleUrls: ['./video-player.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayerComponent {
	posterUrl = input.required<string>();
	embedUrl = input<string | null>(null);
	alt = input<string>('Video');

	private sanitizer = inject(DomSanitizer);

	playing = signal(false);

	safeEmbedUrl = computed(() => {
		const url = this.embedUrl();
		return url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null;
	});

	play() {
		this.playing.set(true);
	}
}
