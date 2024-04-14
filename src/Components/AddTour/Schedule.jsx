import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// Không cần import SimpleUploadAdapter nếu nó đã được include trong build

function Schedule({ content, setContent }) {
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        config={{
          // Cấu hình để sử dụng SimpleUploadAdapter
          simpleUpload: {
            uploadUrl: "http://localhost:5055/upload/images/", // URL của server backend để xử lý việc tải lên hình ảnh
            // Điều này cho phép CKEditor gửi yêu cầu POST tới endpoint này với hình ảnh được chọn để tải lên
            // Bạn cũng có thể thêm headers, như tokens xác thực, nếu cần
            // Ví dụ: headers: { 'X-CSRF-TOKEN': 'CSRF-Token-Value' }
          },
        }}
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
