import { NoteData, Tag } from "../../types";
import NoteForm from "./NoteForm";
import styles from "./create-note.module.css";

export type CreateFormProps = {
  onSubmit: (data: NoteData) => void;
  createTag: (tag: Tag) => void;
  availableTags: Tag[];
  //Partial sayesinde NoteData içerindeki type'lar opsiyonel oldu.
} & Partial<NoteData>;
const CreateNote = ({
  onSubmit,
  availableTags,
  createTag,
}: CreateFormProps) => {
  return (
    <div className={`${styles.createNote} container py-5`}>
      <h2>Yeni Not OLuştur</h2>
      <NoteForm
        onSubmit={onSubmit}
        availableTags={availableTags}
        createTag={createTag}
      />
    </div>
  );
};

export default CreateNote;
