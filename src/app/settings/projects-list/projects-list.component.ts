import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { SettingsService } from 'src/app/core/settings.service';
import { FormControl } from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  projectOptions: string[] = [];
  @ViewChild('projectsList') projectsList: MatSelectionList;
  newProjectFormControl: FormControl = new FormControl();
  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
    this.settingsService.getProjectOptions().subscribe(options => {
      this.projectOptions = options;
    });
  }

  @HostListener('window:keyup', ['$event'])
  public enterEvent(event: KeyboardEvent) {
    console.log(event);
    if (event.keyCode === 13) {
      this.addTask();
    }
  }

  public deleteTasks() {
    const projectsToRemove = [];
    this.projectsList.selectedOptions.selected.forEach(option => {
      projectsToRemove.push(option.getLabel().trim());
    });
    this.settingsService.removeFewProjectOptions(projectsToRemove);
  }

  public addTask(): void {
    const newProject = this.newProjectFormControl.value;
    if (newProject === '') {
      return;
    }
    this.newProjectFormControl.reset();
    this.settingsService.addProjectOption(newProject);
  }
}
