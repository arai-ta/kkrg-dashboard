import React from "react";
import { Widget, SmallLabel } from "@dashbling/client/Widget";
import { Image } from "@dashbling/client/widgets";

const pad0 = (num) => num.toString().padStart(2, "0");

// https://static.tenki.jp/static-images/radar/2019/05/13/00/05/00/pref-22-large.jpg
const radarImage = (prefCode, date) => {
    let year    = date.getFullYear(),
        month   = pad0(date.getMonth() + 1),
        day     = pad0(date.getDate()),
        hour    = pad0(date.getHours()),
        min     = pad0(5 * Math.floor((date.getMinutes() - 1) / 5));
    return `https://static.tenki.jp/static-images/radar/${year}/${month}/${day}/${hour}/${min}/00/pref-${prefCode}-large.jpg`;
}

export const TenkiJpWidget = props => (
  <Widget style={{ backgroundColor: "#12b0c5" }}>
    <SmallLabel>{props.name}</SmallLabel>
    <img src={radarImage(props.pref, props.date)}
         style={{ maxWidth: "100%", maxHeight: "100%" }} />
  </Widget>
);
