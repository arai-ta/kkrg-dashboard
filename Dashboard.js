import React from "react";

import { connect } from "@dashbling/client/dashbling";
import { Dashboard } from "@dashbling/client/components";
import { Clock, Image } from "@dashbling/client/widgets";
import { HelloWidget } from "./widgets/HelloWidget";
import { GitHubStars } from "./widgets/gitHubStars/GitHubStars";
import { CircleCiStatus } from "./widgets/circleCi/CircleCiStatus";
import { WeatherWidget } from "dashbling-widget-weather";

const DashblingGitHubStars = connect("github-stars-dashbling")(GitHubStars);
const DashblingCiStatus = connect("dashbling-ci-status")(CircleCiStatus);
const WeatherInAmsterdam = connect("weather-amsterdam")(WeatherWidget);
const BoundHelloWidget = connect("hello")(HelloWidget);

export default props => {
  return (
    <Dashboard>
      <Clock
        tzdata={require("timezone/Europe/Amsterdam")}
        timezone="Europe/Amsterdam"
        backgroundColor="#00865A"
      />
      <Image src="https://static.tenki.jp/static-images/radar/2019/05/13/00/05/00/pref-22-large.jpg" />
      <BoundHelloWidget name="arai-ta"/>

      <WeatherInAmsterdam title="Amsterdam" />
      <DashblingGitHubStars />
      <DashblingCiStatus />
    </Dashboard>
  );
};
