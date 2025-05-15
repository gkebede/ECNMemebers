import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Typography } from '@mui/material';
import { MemberFile } from '../../../lib/types';

interface Props {
  memberFiles?: MemberFile[];
  setMemberFiles: (files: MemberFile[]) => void;
}

function MemberFileFormSection({memberFiles, setMemberFiles}: Props) {
    //const [fileNames, setFileNames] = useState<string[]>([]);

  interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget;
  }

  const handleFileChange = (event: FileChangeEvent): void => {
    const files = Array.from(event.target.files || []);
    setMemberFiles(files.map((file: File) => ({ filePath: file.name } as MemberFile)));
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      {/* Visible input field */}
      <input
       hidden
        type="file"
        onChange={handleFileChange}
        multiple
        style={{ flexGrow: 1 }}
      />

      {/* Upload button (optional trigger) */}
      <Button sx={{  mt:2, justifyContent: 'start', width:'%' }} color="primary" size="large"
        component="span"  
        variant="contained"
        startIcon={<CloudUploadIcon />}
        onClick={() => {
          const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
          if (fileInput) fileInput.click();
        }}
      >
       <Typography sx={{ fontSize: '1rem', p:1 }} >
       
      Upload files here...
       
     </Typography>
      </Button>
      {/* Display the list of uploaded file names */}
      <ul>
        {memberFiles?.map((memFile, index) => (
          <li key={index}>{memFile.filePath}</li>
        ))}
      </ul>
    </div>
 
  );
     
}
export default MemberFileFormSection;
