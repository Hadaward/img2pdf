import { LinearProgressProps, Box, LinearProgress, Typography, Grid } from "@mui/material";

export function LinearProgressWithLabel(props: LinearProgressProps & { value: number, label?: string }) {
    return (
        <Grid container sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }} flexDirection="column">
            {props.label &&
            <Grid item>
                <Typography variant="body2" color="text.secondary">{props.label}</Typography>
            </Grid>
            }
            <Grid item>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                        <LinearProgress variant="determinate" {...props} />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                        <Typography variant="body2" color="text.secondary">{`${Math.round(
                        props.value,
                        )}%`}</Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}