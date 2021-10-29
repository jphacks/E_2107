import { useHistory } from 'react-router-dom';

// mui
import Button from "@mui/material/Button";

// firebase
import { auth } from "../config/firebase";

const Logout = ()=>{
    const history = useHistory();

    const handleLogout = () => {
        auth.signOut();
        history.push("/signin");
    };

    return(
        <Button
            variant="contained"
            color="secondary"
            onClick={() => {
                handleLogout();
            }}
        >
            ログアウト
        </Button>
    )
}

export default Logout;