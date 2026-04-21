import { Switch, Route } from "wouter";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Schemes from "./pages/Schemes";
import Services from "./pages/Services";
import Grievance from "./pages/Grievance";
import TrackGrievance from "./pages/TrackGrievance";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/schemes" component={Schemes} />
        <Route path="/services" component={Services} />
        <Route path="/grievance" component={Grievance} />
        <Route path="/track" component={TrackGrievance} />
        <Route path="/admin" component={Admin} />
      </Switch>
    </Layout>
  );
}
