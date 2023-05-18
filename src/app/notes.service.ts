import { Injectable, } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note } from './note.model';



@Injectable({
  providedIn: 'root'
})


export class NotesService {
  private notes: Note[] =[
    {title: 'Note 1', content: 'Content of Note 1'},
    {title: 'Note 2', content: 'Content of Note 2'}
  ];
  private selectedIndex = new BehaviorSubject<number>(0)
  private pendingNote?: Note;

  private isNewNoteSubject = new BehaviorSubject<boolean>(false);

  private notesSubject = new BehaviorSubject<Note[]>([]);
notes$ = this.notesSubject.asObservable();

updateNotesArray() {
  this.notesSubject.next([...this.notes]);
}
  

getIsNewNote(): Observable<boolean> {
  return this.isNewNoteSubject.asObservable();
}

setIsNewNote(isNew: boolean) {
  this.isNewNoteSubject.next(isNew);
}


getNotes():Note[] {
  return this.notes
}

addNote(note: Note){
  this.notes.push(note)
}

getSelectedIndex(){
  return this.selectedIndex
}



setSelectedIndex(index: number){
  this.selectedIndex.next(index)
}

addPendingNote(note: Note) {
  this.pendingNote = note;
}

savePendingNote() {
  if (this.pendingNote) {
    this.addNote(this.pendingNote);
    this.pendingNote = undefined;
  }
}
deleteNote(index: number){
  this.notes.splice(index, 1);
  this.updateNotesArray();
  this.saveNotesToStorage();
}

updateNotes(index: number, newnote: Note){
  this.notes[index] = newnote
}



saveNotesToStorage() {
  localStorage.setItem('notes', JSON.stringify(this.notes));
}

loadNotesFromStorage() {
  const storedNotes = localStorage.getItem('notes');
  if (storedNotes) {
    this.notes = JSON.parse(storedNotes);
    this.updateNotesArray();
  }
}

}
