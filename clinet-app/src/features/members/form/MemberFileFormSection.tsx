import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Typography } from '@mui/material';
import { MemberFile } from '../../../lib/types';
import agent from '../../../lib/api/agent';

interface Props {
  memberFiles?: MemberFile[];
  setMemberFiles: (files: MemberFile[]) => void;
}

function MemberFileFormSection({ memberFiles, setMemberFiles }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const files = Array.from(event.target.files || []);
  setMemberFiles(files.map((file: File) => ({ filePath: file.name } as MemberFile)));

  for (const file of files) {
    const formData = new FormData();
    formData.append('file', file); // name must match what the backend expects

    try {
      await agent.Members.upload(formData); // no need to set headers
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Upload failed', error);
    }
  }
};

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Hidden input */}
      <input
        hidden
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
      />

      {/* Trigger button */}
      <Button
        sx={{ mt: 2, alignSelf: 'start' }}
        color="primary"
        size="large"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        onClick={handleUploadClick}
      >
        <Typography sx={{ fontSize: '1rem', p: 1 }}>
          Upload files here...
        </Typography>
      </Button>

      {/* File list */}
      <ul>
        {memberFiles?.map((memFile, index) => (
          <li key={index}>{memFile.filePath}</li>
        ))}
      </ul>
    </div>
  );
}

export default MemberFileFormSection;
