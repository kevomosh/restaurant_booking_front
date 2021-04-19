import React from 'react';
import {withRouter, useHistory} from 'react-router-dom'
import {Button} from "@material-ui/core";

const Header: React.FC = () => {
    const history = useHistory();
    return (
        <div>
            <Button onClick={() => history.push("/createSit")}>Create Sit</Button>
            <Button onClick={() => history.push("/editSit")}>Edit Sit</Button>
            <Button onClick={() => history.push("/daySit")}>Day Sittings</Button>
            <Button onClick={() => history.push("/sit")}>Sitting</Button>
            <Button onClick={() => history.push("/addRes")}>Add Res</Button>
            <Button onClick={() => history.push( "/updateRes")}>update Res</Button>
            <Button onClick={() => history.push( "/allRes")}>All Res</Button>

        </div>
    );
};

export default withRouter(Header);
