// react
import React from 'react';

// mui
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

// config
import categoryDictionaly from '../config/dictionaly'

const SimpleDialog = (props) =>{

    //     - onClose ={onClose(selectedValue)} 固定
    //     - classes ={useStyle} 固定
    //     - open ={open}固定
    //     - selectedCategory ={selectedCategory} 固定

    return (
        <Dialog onClose={props.onClose} open={props.open}>
        {categoryDictionaly.map((category) =>(
            // categoryDictionaryのkeyとselectedCategoryが同じなら表示
            category.key === props.selectedCategory ? (
            <>
                <DialogTitle className={props.classes.dialogtitle}>
                    <Typography variant="h4">{this.category.name}</Typography> :
                </DialogTitle>
                <DialogContent>
                    <Box className={props.classes.dialog}>
                        <Typography variant="h5">{props.data.this.category.key}</Typography>
                    </Box>
                </DialogContent>
            </>
            ) :(
                <>
                    <DialogTitle className={props.classes.dialogtitle}>
                        <Typography variant="h4">データが見つかりません</Typography> :
                    </DialogTitle>
                    <DialogContent>
                        <Box className={props.classes.dialog}>
                            <Typography variant="h5">このデータは設定されていません。</Typography>
                        </Box>
                    </DialogContent>
                </>
            )
        ))}

        </Dialog>
    )
}
export default SimpleDialog;