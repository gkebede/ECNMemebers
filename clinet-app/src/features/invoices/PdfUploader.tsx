import React, { ChangeEvent } from 'react';
import { Box, Button, Typography } from '@mui/material';
import agent from '../../lib/api/agent';
import { Member } from '../../lib/types';

interface UploadFilesProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  accept?: string; // optional, default to images and PDFs
  label?: string;  // optional custom label
  member:Member
}

const UploadFiles: React.FC<UploadFilesProps> = ({
  files = [], // fallback to empty array
  onFilesChange,
  accept = '.png,.jpg,.jpeg,.pdf',
  label = 'Upload Files',
//  member,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      onFilesChange(selectedFiles);
      // Example: agent.Files.upload(element) or similar, if available.
 selectedFiles.forEach(file => {
  const formData = new FormData();
  formData.append('file', file);
 // formData.append(member.id, 'some-guid-here'); // replace with actual member ID
  agent.Members.upload(formData);
})
      
    }
  };

  return (
    <Box>
      <input
        accept={accept}
        style={{ display: 'none' }}
        id="upload-files-input"
        type="file"
        multiple
        onChange={handleChange}
      />
      <label htmlFor="upload-files-input">
        <Button variant="contained" component="span">
          {label}
        </Button>
      </label>

      <Box mt={2}>
        <Typography variant="subtitle1">Selected Files:</Typography>
       {Array.isArray(files) && files.length === 0 ? (
  <Typography variant="body2" color="textSecondary">No files selected.</Typography>
) : (
  files.map((file, index) => (
    <Typography key={index} variant="body2">
      {file.name}
    </Typography>
  ))
)}

      </Box>
    </Box>
  );
};

export default UploadFiles;
