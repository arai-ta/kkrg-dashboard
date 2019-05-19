import React from "react";
import { Widget, SmallLabel } from "@dashbling/client/Widget";
import { Image } from "@dashbling/client/widgets";
import { subHours, subMinutes, addMinutes } from "date-fns";

const pad = (num) => num.toString().padStart(2, "0");

// https://static.tenki.jp/static-images/radar/2019/05/13/00/05/00/pref-22-large.jpg
const getUrl = (pref, date) => {
    let d       = subMinutes(date, 1),
        year    = d.getFullYear(),
        month   = pad(d.getMonth() + 1),
        day     = pad(d.getDate()),
        hour    = pad(d.getHours()),
        min     = pad(5 * Math.floor(d.getMinutes() / 5));
    return `https://static.tenki.jp/static-images/radar/${year}/${month}/${day}/${hour}/${min}/00/pref-${pref}-large.jpg`;
}

export class TenkiJpMapWidget extends React.Component {
    constructor(props) {
        super(props);

        let startDate = subHours(props.date || new Date, 1); // 1 hours before

        this.state = {
            name:   props.name || "Rain Map",
            pref:   props.pref,
            interval: props.interval || 3000,
            end:    new Date,
            start:  startDate,
            date:   startDate,
            index:  0
        };
    }

    tick() {
        this.setState(state => {
            if (state.end - state.date > 0) {
                // increment
                return {
                    date: addMinutes(state.date, 5), // 5 min after
                    index: state.index + 1
                };
            } else {
                // reset
                return {
                    date: new Date(state.start.getTime()),
                    index: 0
                };
            }
        });
    }

    componentDidMount() {
        this.timer - setInterval(() => this.tick(), this.state.interval);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        let progress = Array.from({length:12}, (_, k) => {
            return (
                <span style={ (k > this.state.index) ? {opacity:0.5} : {} }> * </span>
            );
        });

        return (
            <Widget style={{ backgroundColor: "#12b0c5" }}>
              <SmallLabel>{this.state.name}</SmallLabel>
              <a href={`https://tenki.jp/radar/3/${this.state.pref}/`} target="_blank" >
                  <img src={getUrl(this.state.pref, this.state.date)}
                       style={{ maxWidth: "100%", maxHeight: "100%" }} />
              </a>
              <div>
                  {progress}
              </div>
            </Widget>
        );
    }
}

