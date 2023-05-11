import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Box, Typography } from "@mui/material";

function MyEditor({ contentData, setContentData }) {
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContentData(data);
  };

  return (
    <Box>
      <Typography variant="body2" sx={{ marginBottom: 1 }}>
        Mail Body:
      </Typography>
      <CKEditor
        editor={ClassicEditor}
        data={contentData}
        onChange={handleEditorChange}
      />
    </Box>
  );
}

export default MyEditor;
