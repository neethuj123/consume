import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ModalComponent } from './modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReadMoreComponent } from './read-more/read-more.component';

@NgModule({
  declarations: [ModalComponent, ReadMoreComponent],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    TranslateModule,
    ModalComponent,
    ReadMoreComponent
  ]
})
export class SharedModule { }
