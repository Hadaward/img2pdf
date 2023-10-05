import { Avatar, Box, Button, Card, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, ThemeProvider } from '@mui/material';
import { DarkTheme } from './themes';

import { FileUploader } from 'react-drag-drop-files';
import { UploadUI } from './components/UploadUI';
import { useState } from 'react';

import { Delete, Photo } from '@mui/icons-material'
import { Temporal } from '@js-temporal/polyfill'
import { LinearProgressWithLabel } from './components/LinearProgressWithLabel';
import { config } from './config';
import { ErrorDialog } from './components/ErrorDialog';
import { DownloadFileDialog } from './components/DownloadFileDialog';

export function App(): JSX.Element {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [progressText, setProgressText] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadFile, setDownloadFile] = useState("");

  const deleteFile = (file: File) => {
    setFiles(files.filter(x => x !== file));
  }

  const onDropOrSelectFiles = (fileList: FileList) => {
    const newFiles: File[] = [];

    for (const file of Object.values(fileList)) {
      newFiles.push(file);
    }

    setFiles((files) => [...files, ...newFiles]);
  }

  const startTransformation = async () => {
    if (uploading)
      return;

    try {
      setUploading(true);

      setProgressText("Lendo imagens...");
      setProgressValue(0);

      const fileData: (File | { data: number[] })[] = [];

      for (const file of files) {
        const buffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(buffer);

        fileData.push({name: file.name, size: file.size, type: file.type, lastModified: file.lastModified, data: [...uint8Array]});

        setProgressValue(fileData.length * 100 / files.length);
      }

      setProgressText("Enviando imagens...");
      setProgressValue(0);

      const xhr = new XMLHttpRequest();

      xhr.open("POST", `${config.backend.url}${config.backend.endpoints.upload}`, true);
      xhr.responseType = 'arraybuffer';

      xhr.upload.addEventListener("progress", (event: ProgressEvent) => {
        setProgressValue(event.loaded * 100 / event.total);
      });

      xhr.upload.addEventListener("load", () => {
        setProgressText("Aguardando conversão");
      })

      xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState !== 4)
          return;

        setFiles([]);

        if (xhr.status === 200) {
          setDownloadFile(URL.createObjectURL(new Blob([xhr.response], { type: 'application/pdf' })));
        } else {
          setErrorTitle(`Erro ${xhr.status}`);
          setErrorMessage(String.fromCodePoint(...new Uint8Array(xhr.response)));
        }

        setProgressValue(0);
        setProgressText("");
        setUploading(false);
      });

      xhr.addEventListener("error", (e) => {
        if (xhr.status === 0 && e.total === 0) {
          setErrorTitle(`Erro interno`);
          setErrorMessage("Não foi possível conectar-se ao servidor de arquivos.");
        }
      });

      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

      xhr.send(JSON.stringify(fileData));
    } catch (error) {
      setErrorTitle(`Erro ao tentar enviar imagens`);
      setErrorMessage(String(error));
    }
  }

  return (
    <ThemeProvider theme={DarkTheme}>
      {
      errorMessage !== "" &&
      <ErrorDialog title={errorTitle} message={errorMessage} onClose={() => setErrorMessage("")} />
      }
      {
        downloadFile !== "" &&
        <DownloadFileDialog url={downloadFile} onClose={() => setDownloadFile("")} />
      }
      <Card variant='outlined' color='inherit' sx={{
        flexGrow: 1,
        width: {
          xs: 350, // 0
          sm: 550, // 600
          md: 650, // 900
        },
        height: {
          sm: 400
        },
      }}>
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={0.5} direction="column">
              <Grid item justifyContent="center" alignItems="center">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    placeItems: "center",
                    height: {
                      xs: 200,
                    },
                    width: {
                      xs: 350, // 0
                      sm: 550, // 600
                      md: 650, // 900
                    },
                  }}
                >
                  <FileUploader
                    multiple={true}
                    required={true}
                    disabled={uploading}
                    types={["PNG", "JPG", "JPEG"]}
                    children={<UploadUI />}
                    handleChange={onDropOrSelectFiles}
                  />
                </Box>
              </Grid>
              <Grid item>
                <Box
                  sx={{
                    height: {
                      xs: 200
                    },
                    width: {
                      xs: 350, // 0
                      sm: 550, // 600
                      md: 650, // 900
                    },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    placeItems: "center"
                  }}
                >
                  <List
                    sx={{
                      width: {
                        xs: 340, // 0
                        sm: 540, // 600
                        md: 640, // 900
                      },
                      height: {
                        xs: 120
                      },
                      overflow: 'auto'
                    }}
                  >
                    {
                      files.map((file, key) => (
                        <ListItem
                          key={key}
                          secondaryAction={
                            !uploading &&
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => deleteFile(file)}
                            >
                              <Delete />
                            </IconButton>
                          }
                        >
                          <ListItemAvatar>
                            <Avatar>
                              <Photo />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={file.name.length > 40 ? file.name.substring(0, 30) + "..." + file.name.substring(file.name.length - 10) : file.name}
                            secondary={`${file.size / 1000} KB - Modificado em ${Temporal.Instant.fromEpochMilliseconds(file.lastModified).toZonedDateTimeISO(Temporal.Now.timeZoneId()).toPlainDateTime().toLocaleString()}`}
                          />
                        </ListItem>
                      ))
                    }
                  </List>
                  {
                  uploading &&
                  <LinearProgressWithLabel
                    value={progressValue}
                    label={progressText}
                    sx={{
                      width: {
                        xs: 290, // 0
                        sm: 490, // 600
                        md: 590, // 900
                      },
                      height: 5,
                      marginTop: 1
                    }}
                    color="primary"
                  />
                  }
                  {
                  !uploading &&
                  <Button
                    variant="contained"
                    disabled={files.length === 0}
                    sx={{
                      width: {
                        xs: 340, // 0
                        sm: 540, // 600
                        md: 640, // 900
                      },
                      marginTop: 1
                    }}
                    onClick={startTransformation}
                  >
                    Transformar imagens em PDF
                  </Button>
                  }
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </ThemeProvider>
  )
}

export default App
