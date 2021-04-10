import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";
import { MyPage } from "./pages/MyPage";
import { MeetopiaPage } from "./pages/Meetopia/Meetopia";
import { DashboardPage } from "./pages/DashboardPage";
import { GroupPage } from "./pages/GroupPage";
import ListCLassesGroup from "../components/ListCLassesGroup";
import ListCLasses from "../components/ListClasses";
import insideClass from "../components/InsideClass";

const GoogleMaterialPage = lazy(() =>
  import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./modules/ReactBootstrapExamples/ReactBootstrapPage")
);
const ECommercePage = lazy(() =>
  import("./modules/ECommerce/pages/eCommercePage")
);

export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <ContentRoute path="/dashboard" component={DashboardPage} />
        <ContentRoute path="/classesGroupe" component={ListCLassesGroup} />
        <ContentRoute path="/classes" component={ListCLasses} />
        <ContentRoute path="/insideClass" component={insideClass} />
        <ContentRoute path="/listCourses" component={insideClass} />

        <ContentRoute path="/builder" component={BuilderPage} />
        <ContentRoute path="/my-page" component={MyPage} />
        <ContentRoute path="/group" component={GroupPage} />
        <ContentRoute path="/Meetopia" component={MeetopiaPage} />
        <Route path="/google-material" component={GoogleMaterialPage} />

        <Route path="/e-commerce" component={ECommercePage} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
