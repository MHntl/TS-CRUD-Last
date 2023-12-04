export type Tag = {
  label: string;
  value: string;
};

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

//Type Inheritance
export type Note = {
  id: string;
} & NoteData;

//Local Storage için Type

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[]; //Storage'da id ler üzerinden saklanacak
};

export type RawNote = {
  id: string;
} & RawNoteData;
