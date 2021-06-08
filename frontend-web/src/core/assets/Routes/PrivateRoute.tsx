import { Redirect, Route } from "react-router-dom";

import { isAuthenticated } from "core/utils/auth";
import { URL_HOME_LOGIN } from "core/utils/ApiUrl";

type Props = {
    children: React.ReactNode;
    path: string
}

const PrivateRoute = ({ children, path }: Props) => {

    return (
        <Route
            path={path}
            render={({ location }) =>
                isAuthenticated() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: URL_HOME_LOGIN,
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;