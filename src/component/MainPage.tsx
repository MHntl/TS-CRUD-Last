import { Button, Col, Row, Stack, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import NoteCard from "./NoteCard";
import { Note, Tag } from "../types";
import { useMemo, useState } from "react";

type MainPageProps = {
  availableTags: Tag[];
  notes: Note[];
};
const MainPage = ({ availableTags, notes }: MainPageProps) => {
  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  //!Filter
  const filteredNotes = useMemo(
    () =>
      notes.filter((note) => {
        return (
          (title === "" ||
            note.title.toLowerCase().includes(title.toLowerCase())) &&
          (selectedTags.length === 0 ||
            selectedTags.every((s_tag) =>
              note.tags.some((noteTag) => noteTag.value === s_tag.value)
            ))
        );
      }),
    [title, selectedTags, notes]
  );
  return (
    <div style={{ minWidth: "600px" }} className="container py-5">
      {/* üst kısım */}
      <Stack direction="horizontal" className="justify-content-between">
        <h1>Notlar</h1>

        <Link to={"/new"}>
          <Button>Oluştur</Button>
        </Link>
      </Stack>

      {/* filtreleme */}
      <Form className="mt-4">
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Search about Title</Form.Label>
              <Form.Control
                onChange={(e) => setTitle((_prev) => e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="text-black">
              <Form.Label className="text-light">Search about Tags</Form.Label>
              <ReactSelect
                //@ts-ignore
                onChange={(all_tags) => setSelectedTags((_prev) => all_tags)}
                isMulti
                options={availableTags}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {/* not listesi */}
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3 mt-4">
        {filteredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard note={note} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MainPage;
