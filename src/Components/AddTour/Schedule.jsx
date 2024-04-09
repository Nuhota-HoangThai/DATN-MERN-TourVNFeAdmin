import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function Schedule({ content, setContent }) {
  return (
    <div>
      <h2>Lịch trình tour</h2>
      <CKEditor
        editor={ClassicEditor}
        data={content}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
      />
    </div>
  );
}

export default Schedule;
