import React, { useState } from "react";
import { Box, Label, Input, Button } from "@adminjs/design-system";

const UploadImageComponent = (props) => {
  const { record, property, onChange } = props;
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    const formData = new FormData();
    formData.append("file", uploadedFile);

    fetch("/admin1/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        onChange(property.name, data.url);
      })
      .catch((err) => console.error("Upload failed:", err));
  };

  return (
    <Box>
      <Label>{property.label}</Label>
      <Input type="file" onChange={handleFileChange} />
      {record?.params[property.name] && (
        <Box marginTop="lg">
          <img
            src={record.params[property.name]}
            alt="Uploaded file"
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default UploadImageComponent;
