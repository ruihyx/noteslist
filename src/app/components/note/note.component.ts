import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/note.model';
import { NotesService } from 'src/app/notes.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit{
selectedNote?: Note;
originalNote?: Note;
isChanged = false;
isNewNote = false;

constructor(private noteService: NotesService){}
  


ngOnInit(): void {
  this.noteService.getSelectedIndex().subscribe(index => {
    if (index === -1) {
      this.selectedNote = {
        title: '',
        content: ''
      } as Note;
      this.isNewNote = true;
    } else {
      this.selectedNote = this.noteService.getNotes()[index];
      this.isNewNote = false;
    }
    this.originalNote = {...this.selectedNote};
  });

  this.noteService.getIsNewNote().subscribe(isNew => {
    this.isNewNote = isNew;
    if (isNew) {
      this.selectedNote = {
        title: '',
        content: ''
      } as Note;
      this.originalNote = {...this.selectedNote};
    }
  });

}



  onInputChange(){
    this.isChanged = this.selectedNote?.title !== this.originalNote?.content || this.selectedNote?.content !== this.originalNote?.content
  }

  onRevert() {
    this.selectedNote = {
      title: this.originalNote?.title ?? '',
      content: this.originalNote?.content ?? ''
    } ;
    this.isChanged = false;
  }


// onUpdate(){
//   if(this.selectedNote && this.originalNote){
//     this.noteService.getSelectedIndex().subscribe(index =>{
//       if (this.isNewNote){
//       if(this.selectedNote !== undefined){ 
//         this.noteService.addNote(this.selectedNote);
//         this.noteService.setSelectedIndex(this.noteService.getNotes().length - 1);
//         this.noteService.setIsNewNote(false);}
       
//       } 
//       else {
//         this.noteService.getSelectedIndex().subscribe(index => {
//           if(this.selectedNote !== undefined)
//           this.noteService.updateNotes(index, this.selectedNote);
//         });
//       }
//       this.noteService.updateNotesArray(); 
//     if(this.selectedNote !== undefined){
//       this.originalNote = { ...this.selectedNote };
//       this.isChanged = false;
//       this.noteService.saveNotesToStorage();
//       console.log(this.noteService.getNotes())}
      
//     });
//   }
// }
onUpdate() {
  if(this.selectedNote && this.originalNote){
    this.noteService.getSelectedIndex().subscribe(index =>{
     
      if (this.isNewNote && this.selectedNote !== undefined && this.selectedNote.title !== '' && this.selectedNote.content !== '') {
        this.noteService.addPendingNote(this.selectedNote);
        this.noteService.savePendingNote();
        this.noteService.setSelectedIndex(this.noteService.getNotes().length - 1);
        this.noteService.setIsNewNote(false);
      } 
      else if (!this.isNewNote && this.selectedNote !== undefined &&this.selectedNote.title !== '' && this.selectedNote.content !== '') {
        this.noteService.updateNotes(index, this.selectedNote);
      }
      this.noteService.updateNotesArray(); 
      if(this.selectedNote !== undefined){
        this.originalNote = { ...this.selectedNote };
        this.isChanged = false;
        this.noteService.saveNotesToStorage();
        console.log(this.noteService.getNotes());
      }
    });
  }
}

}


