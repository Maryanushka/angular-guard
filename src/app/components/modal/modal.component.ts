import { Component, Input } from '@angular/core';
import { ToggleModalService } from '../../services/toggle-modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

	@Input() title = ''

	constructor(public modalService: ToggleModalService) {}

}
