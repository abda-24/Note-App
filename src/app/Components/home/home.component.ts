import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { NotesService } from '../../Shared/Services/notes.service';
import { INote } from '../../Shared/interface/inote';
import { SearchPipe } from '../../Shared/Pipes/search.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly NotesService = inject(NotesService);
  notesList: INote[] = [];
  noteId!: string;
  TextTerm: string = '';

  AddNote: FormGroup = this.fb.group({
    title: [
      null,
      [
        RxwebValidators.required(),
        RxwebValidators.minLength({ value: 3 }),
        RxwebValidators.maxLength({ value: 50 }),
      ],
    ],
    content: [null, [RxwebValidators.required()]],
  });

  UpdateNoteForm: FormGroup = this.fb.group({
    title: [
      null,
      [
        RxwebValidators.required(),
        RxwebValidators.minLength({ value: 3 }),
        RxwebValidators.maxLength({ value: 50 }),
      ],
    ],
    content: [null, [RxwebValidators.required()]],
  });

  AddNoteSubmit(): void {
    this.NotesService.addUserNotes(this.AddNote.value).subscribe({
      next: (res) => {
        console.log(res);
        this.notesList = res.notes;
        this.AddNote.reset();
        this.getNotes();

        // SweetAlert2 Success Message
        Swal.fire({
          icon: 'success',
          title: 'Note Added!',
          text: 'Your note has been added successfully.',
          confirmButtonColor: '#3085d6',
        });
      },
      error: (err) => {
        console.log(err);

        // SweetAlert2 Error Message
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to add the note. Please try again.',
          confirmButtonColor: '#d33',
        });
      },
    });
  }

  getNotes(): void {
    this.NotesService.getNotes().subscribe({
      next: (res) => {
        console.log(res);
        this.notesList = res.notes;
      },
      error: (err) => {
        console.log(err);
        if (err.error.msg === 'not notes found') {
          this.notesList = [];
        }
      },
    });
  }

  ngOnInit(): void {
    this.getNotes();
  }

  updateNoteSubmit(list: any, id: string): void {
    this.noteId = id;
    this.UpdateNoteForm.patchValue(list);
  }

  updateNote(): void {
    this.NotesService.update(this.noteId, this.UpdateNoteForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.getNotes();

        // SweetAlert2 Success Message
        Swal.fire({
          icon: 'success',
          title: 'Note Updated!',
          text: 'Your note has been updated successfully.',
          confirmButtonColor: '#3085d6',
        });
      },
      error: (err) => {
        console.log(err);

        // SweetAlert2 Error Message
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to update the note. Please try again.',
          confirmButtonColor: '#d33',
        });
      },
    });
  }

  delateTask(id: string): void {
    // SweetAlert2 Confirmation Dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this note!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.NotesService.delateNote(id).subscribe({
          next: (res) => {
            console.log(res);
            this.getNotes();

            // SweetAlert2 Success Message
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Your note has been deleted.',
              confirmButtonColor: '#3085d6',
            });
          },
          error: (err) => {
            console.log(err);

            // SweetAlert2 Error Message
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Failed to delete the note. Please try again.',
              confirmButtonColor: '#d33',
            });
          },
        });
      }
    });
  }
}
