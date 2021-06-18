import { Redirect, Route } from "react-router-dom";

import { isAuthenticated } from "core/utils/auth";
import { URL_HOME_LOGIN } from "core/utils/ApiUrl";

type Props = {
    children: React.ReactNode;
    path: string;
    exact: boolean;
}

const PrivateRoute = ({ children, path, exact }: Props) => {

    return (
        <Route
            path={path}
            render={({ location }) =>
                isAuthenticated() ? (
                    console.log('children', path),
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
            exact={exact}
        />
    );
}

export default PrivateRoute;