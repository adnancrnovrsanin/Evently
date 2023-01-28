import { Skeleton } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'

export default function EventPlaceholder() {
    return (
        <Grid2 lg={12} container marginBottom="20px">
            <Grid2 lg={3}>
                <Skeleton animation="wave" variant='rectangular' height="170px" width="150px"/>
            </Grid2>

            <Grid2 lg={8} container>
                <Grid2 lg={12}>
                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
                    <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
                </Grid2>
                <Grid2 lg={12}>
                    <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
                </Grid2>
                <Grid2 lg={12}>
                    <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
                </Grid2>
                <Grid2 lg={12}>
                    <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
                </Grid2>
            </Grid2>
        </Grid2>
    )
}
