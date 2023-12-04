import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreateNote from "./component/Form/CreateNote";
import EditNote from "./component/Form/EditNote";
import { useMemo } from "react";
import { NoteData, RawNote, Tag } from "./types";
import { v4 } from "uuid";
import { useLocalStorage } from "./utils/UseLocalStorage";
import MainPage from "./component/MainPage";
import DetailPage from "./component/Form/DetailPage";
import Layout from "./component/Form/Layout";

const App = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  //console.log(notes);
  //!Get TagName according to their id
  const noteWithTags = useMemo(
    () =>
      notes.map((note) => ({
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.value)),
      })),
    [notes, tags]
  );
  //console.log(noteWithTags);
  //!Create NewNote
  const addNote = ({ tags, ...data }: NoteData) => {
    const newNote = {
      ...data,
      id: v4(),
      tagIds: tags.map((tag) => tag.value),
    };
    setNotes((_prev) => [..._prev, newNote]);
  };
  //!create NewTag
  const createTag = (tag: Tag) => {
    setTags((_prev) => [..._prev, tag]);
  };
  //!DeleteNote
  const deleteNote = (id: string) => {
    setNotes((_prev) => _prev.filter((note) => note.id !== id));
  };
  //!UpdateNote
  const updateNote = (id: string, { tags, ...data }: NoteData) => {
    const updated = notes.map((note) =>
      note.id === id
        ? {
            ...note,
            ...data,
            tagIds: tags.map((tag) => tag.value),
          }
        : note
    );
    setNotes((_prev) => updated);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage availableTags={tags} notes={noteWithTags} />}
        />
        <Route
          path="/new"
          element={
            <CreateNote
              availableTags={tags}
              createTag={createTag}
              onSubmit={addNote}
            />
          }
        />
        {/* Nested Route Yapısı */}
        {/* Layout componentini tüm elemanlara ortak veriyi ktarmak için kullandık
        Ortak veri URL den elemanın id'si */}
        <Route element={<Layout notes={noteWithTags} />} path="/:id">
          {/* index özelliği üst sayfa seçildiğindeki default gösterilecek olanı belirler */}
          <Route index element={<DetailPage deleteNote={deleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                availableTags={tags}
                createTag={createTag}
                onSubmit={updateNote}
              />
            }
          />
        </Route>
        {/* Tanımsız bir URl ye gidilirse anaSayfaya yönlendir */}
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
