// react
import React from 'react'

// mui
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const Attribute = (props)=>{

    // 必要な引数
    //     - attr(属性) ex.)出身地/特技/好きな曲 etc...
    //     - image(画像素材) title, url,width, heightが必要
    //     - handleClickOpen ={handleClickOpen} 固定で良い

    const ImageButton = styled(ButtonBase)(({ theme }) => ({
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('sm')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &.Mui-focusVisible': {
            zIndex: 1,
            '& .MuiImageBackdrop-root': {
            opacity: 0.15,
            },
            '& .MuiImageMarked-root': {
            opacity: 0,
            },
            '& .MuiTypography-root': {
            border: '4px solid currentColor',
            },
        },
    }));

    const ImageSrc = styled('span')({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    });

    const Image = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    }));

    const ImageBackdrop = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    }));

    const ImageMarked = styled('span')(({ theme }) => ({
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    }));

    return (
        <>
            <ImageButton
                onClick={() => props.handleClickOpen(props.key)}
                focusRipple
                key={props.title}
                style={{
                    height: "225px",
                    width: "150px",
                }}
            >
                <ImageSrc style={{ backgroundImage: `url(%PUBLIC_URL%/${props.url})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                    <Typography
                        component="span"
                        variant="h5"
                        color="inherit"
                        sx={{
                        position: 'relative',
                        p: 4,
                        pt: 2,
                        pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                        }}
                    >
                        {props.name}
                        <ImageMarked className="MuiImageMarked-root" />
                    </Typography>
                </Image>
            </ImageButton>
        </>
    )
}

export default Attribute;