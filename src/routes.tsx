import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanageMap from './pages/OrphanagesMap';

function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route path="/app" component={OrphanageMap} />
            </Switch>
        </BrowserRouter>
    );
}

 export default Routes;