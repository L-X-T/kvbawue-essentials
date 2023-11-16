import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CityPipe } from './pipes/city.pipe';
import { ErrorKeysPipe } from './pipes/error-keys.pipe';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [CityPipe, ErrorKeysPipe],
  exports: [CityPipe, ErrorKeysPipe, CommonModule, FormsModule]
})
export class SharedModule {}
