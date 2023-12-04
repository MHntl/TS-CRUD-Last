import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import ReactSelect from "react-select/creatable";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { Tag } from "../../types";
import { CreateFormProps } from "./CreateNote";
import { v4 } from "uuid";

const NoteForm = ({
  onSubmit,
  availableTags,
  createTag,
  markdown = "",
  tags = [],
  title = "",
}: CreateFormProps) => {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTag, setSelectedTag] = useState<Tag[]>(tags);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //!Create NewNote
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTag,
    });
    navigate(-1);
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)} className="mt-5">
      <Stack>
        {/* TOP */}
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Başlık</Form.Label>
              <Form.Control defaultValue={title} ref={titleRef} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Etiketler</Form.Label>
              <ReactSelect
                value={selectedTag}
                //@ts-ignore
                onChange={(all_tag) => setSelectedTag((_prev) => all_tag)}
                onCreateOption={(text) => {
                  const newTag: Tag = { label: text, value: v4() };
                  //setSelectedTag kaydet
                  setSelectedTag((_prev) => [..._prev, newTag]);
                  //Local storage a kaydet
                  createTag(newTag);
                }}
                className="text-black"
                isMulti
                //Önceden oluşturulanları listele
                options={availableTags}
              />
            </Form.Group>
          </Col>
        </Row>
        {/* Content */}
        <Form.Group className="mt-4">
          <Form.Label>Content</Form.Label>
          <Form.Control
            defaultValue={markdown}
            ref={markdownRef}
            as={"textarea"}
            style={{ minHeight: "300px", maxHeight: "300px" }}
          />
        </Form.Group>
        {/* Buttons */}
        <Stack
          direction="horizontal"
          gap={3}
          className="justify-content-end mt-3"
        >
          <Button type="submit">Kaydet</Button>
          <Button
            onClick={() => navigate(-1)} //bir önceki sayfaya gönderir
            type="button"
            variant="secondary"
          >
            Geri
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export default NoteForm;
