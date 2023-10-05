import { CloudUpload } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";

export function UploadUI(): JSX.Element {
    return (
    <Box
        sx={{
            flexGrow: 1,
            width: {
                xs: 340, // 0
                sm: 540, // 600
                md: 640, // 900
            },
            height: {
                xs: 190
            },
            border: '2px dashed grey',
            justifyContent: "center",
            placeItems: "center"
        }}
    >
        <Grid container spacing={1} direction={"column"}>
            <Grid item justifyContent="center" textAlign="center">
                <CloudUpload sx={{ fontSize: 100 }} />
            </Grid>
            <Grid item justifyContent="center" textAlign="center">
                <Typography>
                    Arraste e solte ou clique aqui para fazer upload de várias imagens
                </Typography>
            </Grid>
        </Grid>
    </Box>
    )
}