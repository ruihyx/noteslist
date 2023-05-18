import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/notes.service';
import { NoteComponent } from '../note/note.component';
import { Note } from 'src/app/note.model';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  notes?: Note[];

  constructor(private noteService: NotesService) {
    this.noteService.loadNotesFromStorage();
  }
  ngOnInit() {
    this.noteService.notes$.subscribe(notes => {
      this.notes = notes;
    });
  }

  onAddNote() {
    this.noteService.setSelectedIndex(-1);
    this.noteService.setIsNewNote(true);
  }

  
  onSelectNote(i: number) {
    this.noteService.setSelectedIndex(i)
    

  }

  onDeletedNote(i: number) {
    this.noteService.deleteNote(i)
  }
}
