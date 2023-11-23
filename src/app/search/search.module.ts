import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from './search.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search.component';
import { AppRoutingModule } from '../app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling'

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, 
            FormsModule, 
            ReactiveFormsModule, 
            HttpClientModule, 
            AppRoutingModule, 
            BrowserAnimationsModule,
            MatFormFieldModule, 
            MatInputModule,
            MatSelectModule,
            MatButtonModule,
            MatGridListModule,
            MatListModule,
            MatIconModule,
            ScrollingModule],
  exports: [SearchComponent],
  providers: [SearchService],
})
export class SearchModule {}
