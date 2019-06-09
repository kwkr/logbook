import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { SettingsService } from 'src/app/core/settings.service';
import { FormControl, AbstractControl } from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  constructor(private settingsService: SettingsService) {}
  projectOptions: string[] = [];
  @ViewChild('projectsList') projectsList: MatSelectionList;
  newProjectFormControl: FormControl = new FormControl(
    '',
    (input: AbstractControl) => {
      if (input.value === '') {
        return { required: '' };
      }
      return null;
    }
  );

  ngOnInit() {
    this.settingsService.getProjectOptions().subscribe(options => {
      this.projectOptions = options;
    });
  }

  @HostListener('window:keyup', ['$event'])
  public enterEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
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
      this.newProjectFormControl.markAsTouched();
      return;
    }
    this.newProjectFormControl.reset();
    this.settingsService.addProjectOption(newProject);
  }
}
