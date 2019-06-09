import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/core/settings.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  projectOptions: string[] = [];
  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
    this.settingsService.getProjectOptions().subscribe(options => {
      this.projectOptions = options;
    });
  }
}
