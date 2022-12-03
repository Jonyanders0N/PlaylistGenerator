import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from './search.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, AppRoutingModule],
  exports: [SearchComponent],
  providers: [SearchService],
})
export class SearchModule {}
